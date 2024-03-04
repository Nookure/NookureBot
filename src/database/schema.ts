import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const tickets = sqliteTable('tickets', {
  id: integer('id').primaryKey(),
  userID: integer('userID'),
  channelID: integer('channelID'),
  category: text('category'),
});

export const suggestions = sqliteTable('tickets', {
  id: integer('id').primaryKey(),
  userID: integer('userID'),
  messageID: integer('messageID'),
  upVotes: integer('upVotes'),
  downVotes: integer('downVotes'),
});
