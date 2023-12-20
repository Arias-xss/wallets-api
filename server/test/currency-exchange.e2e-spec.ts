import * as request from 'supertest';
import type { INestApplication } from '@nestjs/common';

import { CurrencyExchangesModule } from '../src/currency-exchanges/currency-exchanges.module';
import { CurrenciesModule } from '../src/currencies/currencies.module';
import { CurrenciesService } from '../src/currencies/currencies.service';
import { setupAppFixture } from './setup';

import type { Currency } from '../src/currencies/currencies.schema';
import type { CurrencyExchange } from '../src/currency-exchanges/currency-exchanges.schema';

describe('CurrencyExchangesController (e2e)', () => {
  let app: INestApplication;
  let currency: Currency;
  let exchange: CurrencyExchange;

  beforeAll(async () => {
    app = await setupAppFixture([CurrenciesModule, CurrencyExchangesModule]);

    const currencies = app.get(CurrenciesService);
    currency = await currencies.create({ name: 'USD' });
    exchange = {
      destinationCurrencyId: currency.id,
      rate: '0.00044776687465437995',
    };

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/currency-exchanges (POST)', () => {
    return request(app.getHttpServer())
      .post('/currency-exchanges')
      .send(exchange)
      .expect(201)
      .expect(exchange);
  });

  it('/currency-exchanges/:currency (GET)', () => {
    return request(app.getHttpServer())
      .get(`/currency-exchanges/${currency.id}`)
      .expect(200)
      .expect(exchange);
  });

  it('/currency-exchanges/:currency (PATCH)', () => {
    exchange.rate = '123123';
    return request(app.getHttpServer())
      .patch(`/currency-exchanges/${currency.id}`)
      .send({ rate: exchange.rate })
      .expect(200)
      .expect(exchange);
  });

  it('/currency-exchanges (GET)', () => {
    return request(app.getHttpServer())
      .get('/currency-exchanges')
      .expect(200)
      .expect([exchange]);
  });

  it('/currency-exchanges/:currency (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/currency-exchanges/${currency.id}`)
      .expect(204);
  });
});
