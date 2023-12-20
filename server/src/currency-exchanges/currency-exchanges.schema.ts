import type { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Currencies } from '../currencies/currencies.schema';

export const CurrencyExchanges = sqliteTable('currency_exchanges', {
  destinationCurrencyId: integer('destination_id')
    .references(() => Currencies.id)
    .primaryKey(),

  rate: text('rate').notNull(),
});

export type CurrencyExchange = InferSelectModel<typeof CurrencyExchanges>;
