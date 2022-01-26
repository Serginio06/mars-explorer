import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
const configService: ConfigService = new ConfigService();

let context = null;
export const AppContext = async () => {
  if (!context) {
    context = await NestFactory.create(AppModule);
    useContainer(context.select(AppModule), { fallbackOnErrors: true });

    const corsOrigins = configService
      .get('APP_CORS_ORIGINS')
      .split(',')
      .map((origin) => origin.trim());

    const basePath = configService.get('APP_BASE_API_PATH');
    context.setGlobalPrefix(basePath);

    context.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    context.enableCors({
      credentials: true,
      origin: corsOrigins,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
    context.setGlobalPrefix(basePath);

    const swaggerOptions = new DocumentBuilder()
      .setTitle('Mars explorer API')
      .setDescription('This page provides Kiwi API v1 documentation')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(
      context,
      swaggerOptions,
    );

    SwaggerModule.setup(`${basePath}/docs`, context, swaggerDocument);
  }
  return context;
};
