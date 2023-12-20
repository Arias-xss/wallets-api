import { Module } from '@nestjs/common';
import { CurrencyExchangesService } from './currency-exchanges.service';
import { CurrencyExchangesController } from './currency-exchanges.controller';
import { DatabaseModule } from '../database';

@Module({
  imports: [DatabaseModule],
  controllers: [CurrencyExchangesController],
  providers: [CurrencyExchangesService],
})
export class CurrencyExchangesModule {}
