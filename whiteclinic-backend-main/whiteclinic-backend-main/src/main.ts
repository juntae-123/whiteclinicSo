import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationConfig } from './config/validation.config';
import { corsConfig } from './config/cors.config';
import { TransformInterceptor } from './transform/transform.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
