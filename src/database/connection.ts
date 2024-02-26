import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const sqlite = new Database('sqlite.db');

export const db = drizzle(sqlite);

await migrate(db, {migrationsFolder: './drizzle'});

export const close = () => {
  sqlite.close();
};
