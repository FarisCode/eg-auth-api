import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug', 'fatal'],
    cors: true,
  });
  await app.listen(3005);
}
bootstrap();
