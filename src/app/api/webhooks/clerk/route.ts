import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { env } from '@/lib/env'
import { WebhookEvent } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

/**
 * 路由: POST /api/webhooks/clerk
 * 作用: 处理来自 Clerk 的 webhook 事件
 * 参数:
 *   - 整个请求体: Clerk webhook 事件数据
 * 返回: 
 *   - 成功时: 200 状态码
 *   - 失败时: 适当的错误状态码和消息
 */
export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    const primaryEmail = email_addresses?.find(email => email.id === evt.data.primary_email_address_id)

    try {
      await db.insert(users).values({
        email: primaryEmail?.email_address,
        firstName: first_name ?? null,
        lastName: last_name ?? null,
        imageUrl: image_url ?? null,
        externalId: id,
      }).onConflictDoUpdate({
        target: users.externalId,
        set: {
          email: primaryEmail?.email_address,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
        }
      });
      console.log(`User ${id} has been ${eventType === 'user.created' ? 'created' : 'updated'}`)
    } catch (error) {
      console.error('Error updating user in database:', error)
      return new Response('Error updating user in database', {
        status: 500,
      })
    }
  }
  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    if (id) {
      await db.delete(users).where(eq(users.externalId, id));
    }
  }


  return new Response('', { status: 200 })
}
