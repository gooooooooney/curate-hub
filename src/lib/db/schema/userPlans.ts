import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { createCuid } from '@/lib/utils';

export const userPlans = sqliteTable('user_plans', {
  id: text('id').primaryKey().$defaultFn(() => createCuid()),
  userId: text('user_id').references(() => users.id),
  planType: text('plan_type').notNull(), // 'normal', 'pro', etc.
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }),
});
