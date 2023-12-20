import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { type DatabaseClient, DB_PROVIDER_TOKEN } from './database';

export function setupValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}

export function executePendingMigrations(app: INestApplication) {
  const db = app.get<DatabaseClient>(DB_PROVIDER_TOKEN);
  migrate(db, { migrationsFolder: './migrations' });
}
