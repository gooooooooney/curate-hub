import { db } from "@/lib/db";
import { table_itemLikes, table_items } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";

export const likeItem = async (itemId: string, userId: string) => {
  return await db.transaction(async (tx) => {
    const existingLike = await tx.query.table_itemLikes.findFirst({
      where: and(
        eq(table_itemLikes.itemId, itemId),
        eq(table_itemLikes.userId, userId)
      ),
    });

    if (!existingLike) {
      await tx.insert(table_itemLikes).values({
        itemId,
        userId,
      });

      const [updatedItem] = await tx
        .update(table_items)
        .set({ likeCount: sql`${table_items.likeCount} + 1` })
        .where(eq(table_items.id, itemId))
        .returning();

      return {
        ...updatedItem,
        isLiked: true,
      };
    } else {
      const currentItem = await tx.query.table_items.findFirst({
        where: eq(table_items.id, itemId),
      });
      return {
        ...currentItem,
        isLiked: true,
      };
    }
  });
};

export const unlikeItem = async (itemId: string, userId: string) => {
  return await db.transaction(async (tx) => {
    const existingLike = await tx.query.table_itemLikes.findFirst({
      where: and(
        eq(table_itemLikes.itemId, itemId),
        eq(table_itemLikes.userId, userId)
      ),
    });

    if (existingLike) {
      await tx
        .delete(table_itemLikes)
        .where(and(
          eq(table_itemLikes.itemId, itemId),
          eq(table_itemLikes.userId, userId)
        ));

      const [updatedItem] = await tx
        .update(table_items)
        .set({ likeCount: sql`${table_items.likeCount} - 1` })
        .where(eq(table_items.id, itemId))
        .returning();

      return {
        ...updatedItem,
        isLiked: false,
      };
    } else {
      const currentItem = await tx.query.table_items.findFirst({
        where: eq(table_items.id, itemId),
      });
      return {
        ...currentItem,
        isLiked: false,
      };
    }
  });
};
