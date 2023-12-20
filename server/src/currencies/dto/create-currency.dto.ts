import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import type { Currency } from '../currencies.schema';

export class CreateCurrencyDto implements Omit<Currency, 'id'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  symbol: string;
}
