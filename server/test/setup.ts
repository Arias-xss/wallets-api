import type { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { executePendingMigrations, setupValidation } from '../src/startup';

export async function setupAppFixture(
  imports: any[],
): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ envFilePath: '.env.test' }), ...imports],
  }).compile();

  const app = moduleFixture.createNestApplication();
  setupValidation(app);
  executePendingMigrations(app);
  return app;
}
