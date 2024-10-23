import { integer, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { items } from './items';
import { tags } from './tags';

export const itemTags = sqliteTable('item_tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  itemId: integer('item_id').references(() => items.id),
  tagId: integer('tag_id').references(() => tags.id),
}, (table) => ({
  uniqItemTag: uniqueIndex('uniq_item_tag').on(table.itemId, table.tagId),
}));

export type InsertItemTag = typeof itemTags.$inferInsert;


