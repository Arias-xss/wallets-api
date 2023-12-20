import type { drizzle } from 'drizzle-orm/better-sqlite3';

export type DatabaseClient = ReturnType<typeof drizzle>;

export * from './database.module';
export * from './database.decorator';
export * from 'drizzle-orm';
