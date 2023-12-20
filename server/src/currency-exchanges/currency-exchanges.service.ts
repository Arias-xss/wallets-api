import { Injectable, NotFoundException } from '@nestjs/common';
import { type DatabaseClient, InjectDatabase, eq } from '../database';
import type { CreateCurrencyExchangeDto } from './dto/create-currency-exchange.dto';
import type { UpdateCurrencyExchangeDto } from './dto/update-currency-exchange.dto';
import {
  CurrencyExchanges,
  type CurrencyExchange,
} from './currency-exchanges.schema';

@Injectable()
export class CurrencyExchangesService {
  constructor(@InjectDatabase() private readonly db: DatabaseClient) {}

  async create(
    createExchangeDto: CreateCurrencyExchangeDto,
  ): Promise<CurrencyExchange> {
    const [exchange] = await this.db
      .insert(CurrencyExchanges)
      .values(createExchangeDto)
      .returning();

    return exchange;
  }

  async findAll(): Promise<Array<CurrencyExchange>> {
    const results = await this.db.select().from(CurrencyExchanges);
    return results;
  }

  async findOne(id: number): Promise<CurrencyExchange> {
    const [exchange] = await this.db
      .select()
      .from(CurrencyExchanges)
      .where(eq(CurrencyExchanges.destinationCurrencyId, id));

    if (exchange === undefined) {
      throw new NotFoundException(
        `Exchange to currency with ID ${id} was not found`,
      );
    }

    return exchange;
  }

  async update(
    id: number,
    updateExchangeDto: UpdateCurrencyExchangeDto,
  ): Promise<CurrencyExchange> {
    const [exchange] = await this.db
      .update(CurrencyExchanges)
      .set(updateExchangeDto)
      .where(eq(CurrencyExchanges.destinationCurrencyId, id))
      .returning();

    if (exchange === undefined) {
      throw new NotFoundException(
        `Exchange to currency with ID ${id} was not found`,
      );
    }

    return exchange;
  }

  async remove(id: number): Promise<void> {
    const result = await this.db
      .delete(CurrencyExchanges)
      .where(eq(CurrencyExchanges.destinationCurrencyId, id));

    if (result.changes > 0) {
      return;
    }

    throw new NotFoundException(
      `Exchange to currency with ID ${id} was not found`,
    );
  }
}
