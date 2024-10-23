import { sqliteTable, text, AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { relations } from 'drizzle-orm';
import { timestamps } from './columns.helpers';
import { collectionItems } from './collectionItems';
import { createCuid } from '@/lib/utils';

export const collections = sqliteTable('collections', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  userId: text('user_id').references(() => users.id),
  name: text('name').notNull(),
  parentId: text('parent_id').references((): AnySQLiteColumn => collections.id),
  ...timestamps,
});

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users, {
    fields: [collections.userId],
    references: [users.id],
  }),
  collectionItems: many(collectionItems),
}));
