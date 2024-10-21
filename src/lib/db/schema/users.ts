import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from './columns.helpers';
import { relations } from 'drizzle-orm';
import { items } from './items';
import { collections } from './collections';
import { itemLikes } from './itemLikes';
import { userPlans } from './userPlans';
import { userFollows } from './userFollows';

export const users = sqliteTable('users', {
  id: int('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique(),
  username: text('username'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),
  externalId: text('external_id').unique(),
  ...timestamps,
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const usersRelations = relations(users, ({ many, one }) => ({
  collections: many(collections),
  items: many(items),
  itemsLikes: many(itemLikes),
  userFollows: many(userFollows),
  userPlans: one(userPlans, {
    fields: [users.id],
    references: [userPlans.userId],
  }),
}));
