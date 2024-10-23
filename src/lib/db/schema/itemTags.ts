import { text, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { items } from './items';
import { tags } from './tags';
import { createCuid } from '@/lib/utils';

export const itemTags = sqliteTable('item_tags', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  itemId: text('item_id').references(() => items.id),
  tagId: text('tag_id').references(() => tags.id),
}, (table) => ({
  uniqItemTag: uniqueIndex('uniq_item_tag').on(table.itemId, table.tagId),
}));

export type InsertItemTag = typeof itemTags.$inferInsert;

export const itemTagsRelations = relations(itemTags, ({ one }) => ({
  item: one(items, {
    fields: [itemTags.itemId],
    references: [items.id],
  }),
  tag: one(tags, {
    fields: [itemTags.tagId],
    references: [tags.id],
  }),
}));
