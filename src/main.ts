import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
// import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationFilter } from './common/filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
    }),
  );
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: true,
  });
  const port = configService.get('server.port');
  await app.listen(port);
  console.log(`On: ${await app.getUrl()}`);
}
bootstrap();
