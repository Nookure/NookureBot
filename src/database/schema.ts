import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const tickets = sqliteTable('tickets', {
  id: integer('id').primaryKey(),
  userID: integer('userID'),
});
