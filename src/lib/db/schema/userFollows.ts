import { sqliteTable, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const userFollows = sqliteTable('user_follows', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  followerId: integer('follower_id').references(() => users.id),
  followingId: integer('following_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  uniqFollow: uniqueIndex('uniq_follow').on(table.followerId, table.followingId),
}));

export const userFollowsRelations = relations(userFollows, ({ one }) => ({
  follower: one(users, {
    fields: [userFollows.followerId],
    references: [users.id],
  }),
}));



