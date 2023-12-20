import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CurrencyExchangesModule } from './currency-exchanges/currency-exchanges.module';
import { EtherscanModule } from './etherscan/etherscan.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WalletsModule,
    CurrenciesModule,
    CurrencyExchangesModule,
    EtherscanModule,
  ],
})
export class AppModule {}
