import { Module, Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Database from 'better-sqlite3';

export const DB_PROVIDER_TOKEN = Symbol('app-db-client');

const DatabaseClientProvider: Provider = {
  provide: DB_PROVIDER_TOKEN,
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const db = new Database(configService.getOrThrow<string>('DB_NAME'));
    return drizzle(db);
  },
};

@Module({
  imports: [ConfigModule],
  exports: [DatabaseClientProvider],
  providers: [DatabaseClientProvider],
})
export class DatabaseModule {}
