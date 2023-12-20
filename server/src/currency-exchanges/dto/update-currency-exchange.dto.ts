import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCurrencyExchangeDto } from './create-currency-exchange.dto';

export class UpdateCurrencyExchangeDto extends OmitType(
  PartialType(CreateCurrencyExchangeDto),
  ['destinationCurrencyId'],
) {}
