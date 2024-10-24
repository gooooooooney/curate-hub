import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from './columns.helpers';
import { createCuid } from '@/lib/utils';
import { relations } from 'drizzle-orm';
import { table_itemTags } from './itemTags';

export const table_tags = sqliteTable('tags', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  name: text('name').unique(),
  ...timestamps,
});

export const tagsRelations = relations(table_tags, ({ many }) => ({
  itemTags: many(table_itemTags),
}));
