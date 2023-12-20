import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import type { CurrencyExchange } from '../currency-exchanges.schema';

export class CreateCurrencyExchangeDto implements CurrencyExchange {
  @IsNumber({ maxDecimalPlaces: 0 })
  destinationCurrencyId: number;

  @IsNumberString()
  @IsNotEmpty()
  rate: string;
}
