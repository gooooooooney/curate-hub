import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  email: text('email').unique(),
  username: text('username'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),
  externalId: text('external_id').unique(),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
