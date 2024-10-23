import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { relations } from 'drizzle-orm';
import { createCuid } from '@/lib/utils';

export const userFollows = sqliteTable('user_follows', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  followerId: text('follower_id').references(() => users.id),
  followingId: text('following_id').references(() => users.id),
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



