import { Test } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseClient, InjectDatabase, sql } from '.';
import { Injectable } from '@nestjs/common';

@Injectable()
class TestService {
  constructor(@InjectDatabase() public readonly dbClient: DatabaseClient) {}

  select1() {
    this.dbClient.run(sql`SELECT 1`);
    return true;
  }
}

describe('DatabaseModule', () => {
  const DB_NAME = ':memory:';
  let testService: TestService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [() => ({ DB_NAME })],
          isGlobal: true,
        }),
        DatabaseModule,
      ],
      providers: [TestService],
    }).compile();

    testService = moduleRef.get(TestService);
  });

  it('DatabaseClient gets injected properly', () => {
    expect(testService).toBeDefined();
    expect(testService.dbClient).toBeDefined();
  });

  it('Database client executes a query', () => {
    expect(testService.select1()).toBe(true);
  });
});
