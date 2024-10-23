import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { collectionItems } from './collectionItems';
import { timestamps } from './columns.helpers';
import { itemLikes } from './itemLikes';
import { users } from './users';

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

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

export const itemSelect = createSelectSchema(items);

export type ItemSelect = z.infer<typeof itemSelect>;

export const itemInsert = createInsertSchema(items)

export type InsertItem = z.infer<typeof itemInsert>;