import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { table_items } from './items';
import { table_users } from './users';
import { relations } from 'drizzle-orm';
import { createCuid } from '@/lib/utils';

export const table_itemLikes = sqliteTable('item_likes', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  itemId: text('item_id').references(() => table_items.id),
  userId: text('user_id').references(() => table_users.id),
}, (table) => ({
  uniqLike: uniqueIndex('uniq_like').on(table.itemId, table.userId),
}));

export const itemLikesRelations = relations(table_itemLikes, ({ one }) => ({
  item: one(table_items, {
    fields: [table_itemLikes.itemId],
    references: [table_items.id],
  }),
  user: one(table_users, {
    fields: [table_itemLikes.userId],
    references: [table_users.id],
  }),
}));
