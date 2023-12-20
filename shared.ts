export type { Wallet } from "./server/src/wallets/wallets.schema";
export type { CreateWalletDto as CreateWallet } from "./server/src/wallets/dto/create-wallet.dto";
export type { UpdateWalletDto as UpdateWallet } from "./server/src/wallets/dto/update-wallet.dto";
export type { FindAllWalletsDto as FindAllWallets } from "./server/src/wallets/dto/find-all-wallets.dto";

export type { Currency } from "./server/src/currencies/currencies.schema";
export type { CreateCurrencyDto as CreateCurrency } from "./server/src/currencies/dto/create-currency.dto";
export type { UpdateCurrencyDto as UpdateCurrency } from "./server/src/currencies/dto/update-currency.dto";

export type { CurrencyExchange } from "./server/src/currency-exchanges/currency-exchanges.schema";
export type { CreateCurrencyExchangeDto as CreateCurrencyExchange } from "./server/src/currency-exchanges/dto/create-currency-exchange.dto";
export type { UpdateCurrencyExchangeDto as UpdateCurrencyExchange } from "./server/src/currency-exchanges/dto/update-currency-exchange.dto";
