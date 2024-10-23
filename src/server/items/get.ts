import { db } from "@/lib/db";
import { items } from "@/lib/db/schema/items";
import { itemTags } from "@/lib/db/schema/itemTags";
import { tags } from "@/lib/db/schema/tags";
import { and, eq } from "drizzle-orm";

export const getItemsByUserId = async (userId: number) => {
  const itemList = await db.query.items.findMany({
    where: eq(items.userId, userId),
    columns: {
      deletedAt: false,
      isDeleted: false,
    }
  })
  return itemList;
}

export const getItemsByTag = async (userId: number, tagId: number) => {
  return await db.transaction(async (tx) => {
    const tag = await tx.query.tags.findFirst({
      where: eq(tags.id, tagId)
    });
    if (!tag) {
      return [];
    }
    return await tx.query.items.findMany({
      where: and(
        eq(items.userId, userId),
        eq(itemTags.tagId, tag.id)
      )
    });
  });
}

