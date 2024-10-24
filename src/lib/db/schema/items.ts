import { createCuid } from '@/lib/utils';
import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { table_collectionItems } from './collectionItems';
import { timestamps } from './columns.helpers';
import { table_itemLikes } from './itemLikes';
import { table_itemTags } from './itemTags';
import { table_users } from './users';

export const table_items = sqliteTable('items', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  userId: text('user_id').references(() => table_users.id),
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
  likeCount: integer('like_count').notNull().default(0),
});

export const itemsRelations = relations(table_items, ({ many, one }) => ({
  itemsLikes: many(table_itemLikes),
  collectionItems: many(table_collectionItems),
  user: one(table_users, {
    fields: [table_items.userId],
    references: [table_users.id],
  }),
  itemTags: many(table_itemTags),
}));

export type Item = typeof table_items.$inferSelect;
export type NewItem = typeof table_items.$inferInsert;

export const itemSelect = createSelectSchema(table_items);

export type ItemSelect = z.infer<typeof itemSelect>;

export const itemInsert = createInsertSchema(table_items)

export type InsertItem = z.infer<typeof itemInsert>;
