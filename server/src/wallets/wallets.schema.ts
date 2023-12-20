import type { InferSelectModel } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Wallets = sqliteTable(
  'wallets',
  {
    address: text('address').primaryKey(),
    favorite: integer('favorite', { mode: 'boolean' }).notNull(),
    old: integer('old', { mode: 'boolean' }).notNull(),
    balance: text('balance').notNull(),
  },
  (table) => ({
    favorite: index('idx_favorite').on(table.favorite),
  }),
);

export type Wallet = InferSelectModel<typeof Wallets>;
