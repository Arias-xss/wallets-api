import type { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Currencies = sqliteTable('currencies', {
  id: integer('id').primaryKey(),
  name: text('code').notNull(),
  symbol: text('symbol').notNull(),
});

export type Currency = InferSelectModel<typeof Currencies>;
