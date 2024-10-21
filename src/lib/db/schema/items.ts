import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { timestamps } from './columns.helpers';
import { relations } from 'drizzle-orm';
import { itemLikes } from './itemLikes';
import { collectionItems } from './collectionItems';

export const items = sqliteTable('items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  url: text('url'),
  title: text('title'),
  image: text('image'),
  description: text('description'),
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  type: text('type').default('website'),
  viewCount: integer('view_count').default(0),
  order: integer('order'),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
  ...timestamps,
});

export const itemsRelations = relations(items, ({ many, one }) => ({
  itemsLikes: many(itemLikes),
  collectionItems: many(collectionItems),
  user: one(users, {
    fields: [items.userId],
    references: [users.id],
  }),
}));
