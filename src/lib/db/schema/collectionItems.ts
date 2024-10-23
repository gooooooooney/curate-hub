import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { collections } from './collections';
import { items } from './items';
import { createCuid } from '@/lib/utils';

export const collectionItems = sqliteTable('collection_items', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  collectionId: text('collection_id').references(() => collections.id),
  itemId: text('item_id').references(() => items.id),
  order: integer('order'),
}, (table) => ({
  uniqCollectionItem: uniqueIndex('uniq_collection_item').on(table.collectionId, table.itemId),
}));

export const collectionItemsRelations = relations(collectionItems, ({ one }) => ({
  collection: one(collections, {
    fields: [collectionItems.collectionId],
    references: [collections.id],
  }),
  item: one(items, {
    fields: [collectionItems.itemId],
    references: [items.id],
  }),
}));
