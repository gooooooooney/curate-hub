import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { table_collections } from './collections';
import { table_items } from './items';
import { createCuid } from '@/lib/utils';

export const table_collectionItems = sqliteTable('collection_items', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  collectionId: text('collection_id').references(() => table_collections.id),
  itemId: text('item_id').references(() => table_items.id),
  order: integer('order'),
}, (table) => ({
  uniqCollectionItem: uniqueIndex('uniq_collection_item').on(table.collectionId, table.itemId),
}));

export const collectionItemsRelations = relations(table_collectionItems, ({ one }) => ({
  collection: one(table_collections, {
    fields: [table_collectionItems.collectionId],
    references: [table_collections.id],
  }),
  item: one(table_items, {
    fields: [table_collectionItems.itemId],
    references: [table_items.id],
  }),
}));
