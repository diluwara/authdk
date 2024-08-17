import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Apply global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors({
    origin: configService.get<string>('reactPortUri'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(configService.get<string>('port') || 3000);
}
bootstrap();
