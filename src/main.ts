import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters';
import { AppModule } from './modules';
import { AuthGuard } from './guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.setGlobalPrefix('/v1/api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard(reflector));

  await app.listen(3000);
}
bootstrap();
