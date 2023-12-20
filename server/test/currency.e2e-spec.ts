import * as request from 'supertest';
import type { INestApplication } from '@nestjs/common';

import { CurrenciesModule } from '../src/currencies/currencies.module';
import { setupAppFixture } from './setup';

import type { Currency } from '../src/currencies/currencies.schema';

describe('CurrenciesController (e2e)', () => {
  let app: INestApplication;
  const currency: Currency = {
    id: 1,
    name: 'USD',
  };

  beforeAll(async () => {
    app = await setupAppFixture([CurrenciesModule]);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/currencies (POST)', () => {
    return request(app.getHttpServer())
      .post('/currencies')
      .send({ name: 'USD' })
      .expect(201)
      .expect(currency);
  });

  it('/currencies/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/currencies/${currency.id}`)
      .expect(200)
      .expect(currency);
  });

  it('/currencies/:id (PATCH)', () => {
    currency.name = 'EUR';
    return request(app.getHttpServer())
      .patch(`/currencies/${currency.id}`)
      .send({ name: currency.name })
      .expect(200)
      .expect(currency);
  });

  it('/currencies (GET)', () => {
    return request(app.getHttpServer())
      .get('/currencies')
      .expect(200)
      .expect([currency]);
  });

  it('/currencies/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/currencies/${currency.id}`)
      .expect(204);
  });
});
