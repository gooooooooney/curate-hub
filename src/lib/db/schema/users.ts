import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { collections } from './collections';
import { timestamps } from './columns.helpers';
import { itemLikes } from './itemLikes';
import { items } from './items';
import { userFollows } from './userFollows';
import { userPlans } from './userPlans';
import { createCuid } from '@/lib/utils';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  email: text('email').unique(),
  username: text('username'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),
  externalId: text('external_id').unique(),
  ...timestamps,
});



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

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const userSelect = createSelectSchema(users);
export const userInsert = createInsertSchema(users);
