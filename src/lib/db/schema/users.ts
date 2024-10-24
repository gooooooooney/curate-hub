import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { table_collections } from './collections';
import { timestamps } from './columns.helpers';
import { table_itemLikes } from './itemLikes';
import { table_items } from './items';
import { table_userFollows } from './userFollows';
import { table_userPlans } from './userPlans';
import { createCuid } from '@/lib/utils';

export const table_users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  email: text('email').unique(),
  username: text('username'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),
  externalId: text('external_id').unique(),
  ...timestamps,
});

export const usersRelations = relations(table_users, ({ many, one }) => ({
  collections: many(table_collections),
  items: many(table_items),
  itemsLikes: many(table_itemLikes),
  userFollows: many(table_userFollows),
  userPlans: one(table_userPlans, {
    fields: [table_users.id],
    references: [table_userPlans.userId],
  }),
}));

export type SelectUser = typeof table_users.$inferSelect;
export type InsertUser = typeof table_users.$inferInsert;

export const userSelect = createSelectSchema(table_users);
export const userInsert = createInsertSchema(table_users);
