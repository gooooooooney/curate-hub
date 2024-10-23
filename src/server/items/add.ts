import { db } from "@/lib/db";
import { items, type InsertItem } from "@/lib/db/schema/items";
import { itemTags, type InsertItemTag } from "@/lib/db/schema/itemTags";

export const addItem = async (item: InsertItem, tagIds: string[]) => {
  return await db.transaction(async (tx) => {
    const [insertedItem] = await tx.insert(items).values(item).returning({ id: items.id });

    if (tagIds.length > 0) {
      const itemTagsToInsert: InsertItemTag[] = tagIds.map(tagId => ({
        itemId: insertedItem.id,
        tagId: tagId
      }));

      await tx.insert(itemTags).values(itemTagsToInsert);
    }

    return insertedItem;
  });
}
