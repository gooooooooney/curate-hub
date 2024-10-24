import { db } from "@/lib/db";
import { InsertItem, table_items } from "@/lib/db/schema";
import { and, eq, isNull, inArray } from "drizzle-orm";

export const updateItem = async (itemId: string, updatedData: Partial<InsertItem>) => {
    console.log(updatedData)
    const [updatedItem] = await db
        .update(table_items)
        .set(updatedData)
        .where(and(eq(table_items.id, itemId), eq(table_items.isDeleted, false), isNull(table_items.deletedAt)))
        .returning();

    if (!updatedItem) {
        throw new Error("Item not found or has been deleted");
    }

    return updatedItem;
}

export const deleteItem = async (itemId: string) => {
    return await db.transaction(async (tx) => {
        await tx
            .update(table_items)
            .set({ isDeleted: true, deletedAt: new Date() })
            .where(eq(table_items.id, itemId));
    });
}


export const restoreItems = async (itemIds: string[]) => {
  return await db.transaction(async (tx) => {
    const restoredItems = await tx
      .update(table_items)
      .set({ isDeleted: false, deletedAt: null })
      .where(inArray(table_items.id, itemIds))
      .returning();

    if (restoredItems.length === 0) {
      throw new Error("No items found or none are deleted");
    }

    return restoredItems;
  });
}
