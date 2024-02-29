import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import logger from '@/logger';

const sqlite = new Database('sqlite.db');

export const db = drizzle(sqlite);

await migrate(db, {migrationsFolder: './drizzle'});

logger.info('Database connected!');

export const close = () => {
  sqlite.close();
};
