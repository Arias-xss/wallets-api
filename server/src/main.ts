import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupValidation, executePendingMigrations } from './startup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupValidation(app);
  executePendingMigrations(app);

  app.enableCors({
    origin: '*',
  });

  await app.listen(3000);
}

bootstrap();
