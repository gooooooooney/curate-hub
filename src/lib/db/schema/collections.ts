import { sqliteTable, text, AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { table_users } from './users';
import { relations } from 'drizzle-orm';
import { timestamps } from './columns.helpers';
import { table_collectionItems } from './collectionItems';
import { createCuid } from '@/lib/utils';

export const table_collections = sqliteTable('collections', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  userId: text('user_id').references(() => table_users.id),
  name: text('name').notNull(),
  parentId: text('parent_id').references((): AnySQLiteColumn => table_collections.id),
  ...timestamps,
});

export const collectionsRelations = relations(table_collections, ({ one, many }) => ({
  user: one(table_users, {
    fields: [table_collections.userId],
    references: [table_users.id],
  }),
  collectionItems: many(table_collectionItems),
}));
