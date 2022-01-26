import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppContext } from './app.context';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await AppContext();

  Logger.warn('Server started on port ' + process.env.APP_PORT || 7000);

  await app.listen(process.env.APP_PORT || 7000);
}
bootstrap();
