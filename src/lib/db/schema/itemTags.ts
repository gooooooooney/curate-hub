import { text, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { table_items } from './items';
import { table_tags } from './tags';
import { createCuid } from '@/lib/utils';

export const table_itemTags = sqliteTable('item_tags', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  itemId: text('item_id').references(() => table_items.id),
  tagId: text('tag_id').references(() => table_tags.id),
}, (table) => ({
  uniqItemTag: uniqueIndex('uniq_item_tag').on(table.itemId, table.tagId),
}));

export type InsertItemTag = typeof table_itemTags.$inferInsert;

export const itemTagsRelations = relations(table_itemTags, ({ one }) => ({
  item: one(table_items, {
    fields: [table_itemTags.itemId],
    references: [table_items.id],
  }),
  tag: one(table_tags, {
    fields: [table_itemTags.tagId],
    references: [table_tags.id],
  }),
}));
