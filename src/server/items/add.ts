import { db } from "@/lib/db";
import { InsertItem, InsertItemTag, table_items, table_itemTags } from "@/lib/db/schema";

export const addItem = async (item: InsertItem, tagIds: string[]) => {
  return await db.transaction(async (tx) => {
    const [insertedItem] = await tx.insert(table_items).values(item).returning({ id: table_items.id });

    if (tagIds.length > 0) {
      const itemTagsToInsert: InsertItemTag[] = tagIds.map(tagId => ({
        itemId: insertedItem.id,
        tagId: tagId
      }));

      await tx.insert(table_itemTags).values(itemTagsToInsert);
    }

    return insertedItem;
  });
}
