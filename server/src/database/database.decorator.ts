import { Inject } from '@nestjs/common';
import { DB_PROVIDER_TOKEN } from './database.module';

export function InjectDatabase(): ParameterDecorator {
  return Inject(DB_PROVIDER_TOKEN);
}
