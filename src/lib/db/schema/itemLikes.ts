import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { items } from './items';
import { users } from './users';
import { relations } from 'drizzle-orm';
import { createCuid } from '@/lib/utils';

export const itemLikes = sqliteTable('item_likes', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  itemId: text('item_id').references(() => items.id),
  userId: text('user_id').references(() => users.id),
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
