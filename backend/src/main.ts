import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Apply global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();

  // Configure CORS
  // app.enableCors({
  //   origin: 'https://your-react-app.com', // Replace with your React app's URL
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
