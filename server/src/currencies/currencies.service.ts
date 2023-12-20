import { Injectable, NotFoundException } from '@nestjs/common';
import { type DatabaseClient, InjectDatabase, eq } from '../database';
import type { CreateCurrencyDto } from './dto/create-currency.dto';
import type { UpdateCurrencyDto } from './dto/update-currency.dto';
import { type Currency, Currencies } from './currencies.schema';

@Injectable()
export class CurrenciesService {
  constructor(@InjectDatabase() private readonly db: DatabaseClient) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const [currency] = await this.db
      .insert(Currencies)
      .values(createCurrencyDto)
      .returning();

    return currency;
  }

  async findAll(): Promise<Array<Currency>> {
    const results = await this.db.select().from(Currencies);
    return results;
  }

  async findOne(id: number): Promise<Currency> {
    const [currency] = await this.db
      .select()
      .from(Currencies)
      .where(eq(Currencies.id, id));

    if (currency === undefined) {
      throw new NotFoundException(`Currency with ID ${id} was not found`);
    }

    return currency;
  }

  async update(
    id: number,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<Currency> {
    const [currency] = await this.db
      .update(Currencies)
      .set(updateCurrencyDto)
      .where(eq(Currencies.id, id))
      .returning();

    if (currency === undefined) {
      throw new NotFoundException(`Currency with ID ${id} was not found`);
    }

    return currency;
  }

  async remove(id: number): Promise<void> {
    const result = await this.db
      .delete(Currencies)
      .where(eq(Currencies.id, id));

    if (result.changes > 0) {
      return;
    }

    throw new NotFoundException(`Currency with ID ${id} was not found`);
  }
}
