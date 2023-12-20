import * as request from 'supertest';
import type { INestApplication } from '@nestjs/common';

import { WalletsModule } from '../src/wallets/wallets.module';
import { setupAppFixture } from './setup';

import { Wallet } from '../src/wallets/wallets.schema';

describe('WalletsController (e2e)', () => {
  let app: INestApplication;
  const wallet: Wallet = {
    address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
    favorite: false,
    old: true,
    balance: expect.any(String),
  };

  beforeAll(async () => {
    app = await setupAppFixture([WalletsModule]);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/wallets (POST)', () => {
    return request(app.getHttpServer())
      .post('/wallets')
      .send({
        address: wallet.address,
        favorite: wallet.favorite,
      })
      .expect(201)
      .then((response) => expect(response.body).toEqual(wallet));
  });

  it('/wallets/:address (GET)', () => {
    return request(app.getHttpServer())
      .get(`/wallets/${wallet.address}`)
      .expect(200)
      .then((response) => expect(response.body).toEqual(wallet));
  });

  it('/wallets/:address (PATCH)', () => {
    wallet.favorite = true;
    return request(app.getHttpServer())
      .patch(`/wallets/${wallet.address}`)
      .send({ favorite: wallet.favorite })
      .expect(200)
      .then((response) => expect(response.body).toEqual(wallet));
  });

  it('/wallets (GET)', () => {
    return request(app.getHttpServer())
      .get('/wallets')
      .expect(200)
      .then((response) => expect(response.body).toEqual([wallet]));
  });

  it('/wallets/:address/refresh-balance (POST)', () => {
    return request(app.getHttpServer())
      .post(`/wallets/${wallet.address}/refresh-balance`)
      .send({})
      .expect(200)
      .then((response) =>
        expect(response.body.balance).toEqual(expect.any(String)),
      );
  });

  it('/wallets/:address (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/wallets/${wallet.address}`)
      .expect(204);
  });
});
