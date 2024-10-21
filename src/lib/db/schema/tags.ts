import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { timestamps } from './columns.helpers';

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique(),
  ...timestamps,
});
