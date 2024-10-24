import { db } from "@/lib/db";
import { table_itemLikes, table_items } from "@/lib/db/schema";
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
    const existingLike = await tx.query.table_itemLikes.findFirst({
      where: and(
        eq(table_itemLikes.itemId, itemId),
        eq(table_itemLikes.userId, userId)
      ),
    });

    if (!existingLike) {
      console.log({ itemId, userId });
      // 如果用户还没有点赞过，添加新的点赞记录
      const newLike = await tx.insert(table_itemLikes).values({
        itemId,
        userId,
      });
      console.log('newLike', newLike);

      // 更新item的点赞数
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
      // 如果用户已经点赞过，返回当前item信息，不做任何更改
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

/**
 * 取消给指定的item的点赞
 * @param itemId 要取消点赞的item的ID
 * @param userId 取消点赞用户的ID
 * @returns 更新后的item信息，包括新的点赞数
 */
export const unlikeItem = async (itemId: string, userId: string) => {
  return await db.transaction(async (tx) => {
    // 检查用户是否已经点赞过这个item
    const existingLike = await tx.query.table_itemLikes.findFirst({
      where: and(
        eq(table_itemLikes.itemId, itemId),
        eq(table_itemLikes.userId, userId)
      ),
    });

    if (existingLike) {
      // 如果存在点赞记录，删除它
      await tx
        .delete(table_itemLikes)
        .where(and(
          eq(table_itemLikes.itemId, itemId),
          eq(table_itemLikes.userId, userId)
        ));

      // 更新item的点赞数
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
      // 如果用户没有点赞过，返回当前item信息，不做任何更改
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

// 新增函数：获取item的点赞状态
export const getItemLikeStatus = async (itemId: string, userId: string) => {
  const existingLike = await db.query.table_itemLikes.findFirst({
    where: and(
      eq(table_itemLikes.itemId, itemId),
      eq(table_itemLikes.userId, userId)
    ),
  });

  const item = await db.query.table_items.findFirst({
    where: eq(table_items.id, itemId),
  });

  return {
    ...item,
    isLiked: !!existingLike,
  };
};
