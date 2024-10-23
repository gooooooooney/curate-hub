import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { auth } from "@clerk/nextjs/server";
import { eq } from 'drizzle-orm';
import { redirect } from "next/navigation";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const getUserAuth = async () => {
  const { userId } = await auth();

  if (userId) {
    const user = await db.select().from(users).where(eq(users.externalId, userId)).get();
    return {
      session: {
        user: {
          id: userId,
          name: user ? `${user.firstName} ${user.lastName}` : undefined,
          email: user?.email,
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
};
