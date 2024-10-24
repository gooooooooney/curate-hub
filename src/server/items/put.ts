import { db } from "@/lib/db";
import { itemLikes, items } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";

/**
 * 给指定的item点赞
 * @param itemId 要点赞的item的ID
 * @param userId 点赞用户的ID
 * @returns 更新后的item信息，包括新的点赞数
 */
export const likeItem = async (itemId: string, userId: string) => {
  return await db.transaction(async (tx) => {
    // 检查用户是否已经点赞过这个item
    const existingLike = await tx.query.itemLikes.findFirst({
      where: and(
        eq(itemLikes.itemId, itemId),
        eq(itemLikes.userId, userId)
      ),
    });

    if (!existingLike) {
      console.log({ itemId, userId });
      // 如果用户还没有点赞过，添加新的点赞记录
      const newLike = await tx.insert(itemLikes).values({
        itemId,
        userId,
      });
      console.log('newLike', newLike);

      // 更新item的点赞数
      const [updatedItem] = await tx
        .update(items)
        .set({ likeCount: sql`${items.likeCount} + 1` })
        .where(eq(items.id, itemId))
        .returning();

      return updatedItem;
    } else {
      // 如果用户已经点赞过，返回当前item信息，不做任何更改
      return await tx.query.items.findFirst({
        where: eq(items.id, itemId),
      });
    }
  });
};

/**
 * 取消给指定的item的点赞
 * @param itemId 要取消点赞的item的ID
 * @param userId 取消点赞用户的ID
 * @returns 更新后的item信息，包括新的点赞数
 */
export const unlikeItem = async (itemId: string, userId: string) => {
  return await db.transaction(async (tx) => {
    // 检查用户是否已经点赞过这个item
    const existingLike = await tx.query.itemLikes.findFirst({
      where: and(
        eq(itemLikes.itemId, itemId),
        eq(itemLikes.userId, userId)
      ),
    });

    if (existingLike) {
      // 如果存在点赞记录，删除它
      await tx
        .delete(itemLikes)
        .where(and(
          eq(itemLikes.itemId, itemId),
          eq(itemLikes.userId, userId)
        ));

      // 更新item的点赞数
      const [updatedItem] = await tx
        .update(items)
        .set({ likeCount: sql`${items.likeCount} - 1` })
        .where(eq(items.id, itemId))
        .returning();

      return updatedItem;
    } else {
      // 如果用户没有点赞过，返回当前item信息，不做任何更改
      return await tx.query.items.findFirst({
        where: eq(items.id, itemId),
      });
    }
  });
};

