import { sqliteTable, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { items } from './items';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const itemLikes = sqliteTable('item_likes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  itemId: integer('item_id').references(() => items.id),
  userId: integer('user_id').references(() => users.id),
}, (table) => ({
  uniqLike: uniqueIndex('uniq_like').on(table.itemId, table.userId),
}));

export const itemLikesRelations = relations(itemLikes, ({ one }) => ({
  item: one(items, {
    fields: [itemLikes.itemId],
    references: [items.id],
  }),
  user: one(users, {
    fields: [itemLikes.userId],
    references: [users.id],
  }),
}));

