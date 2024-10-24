import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { table_users } from './users';
import { relations } from 'drizzle-orm';
import { createCuid } from '@/lib/utils';

export const table_userFollows = sqliteTable('user_follows', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  followerId: text('follower_id').references(() => table_users.id),
  followingId: text('following_id').references(() => table_users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  uniqFollow: uniqueIndex('uniq_follow').on(table.followerId, table.followingId),
}));

export const userFollowsRelations = relations(table_userFollows, ({ one }) => ({
  follower: one(table_users, {
    fields: [table_userFollows.followerId],
    references: [table_users.id],
  }),
}));



