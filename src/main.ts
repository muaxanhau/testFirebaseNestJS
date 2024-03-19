import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters';
import { AppModule } from './modules';
import { AdminRoleGuard, AuthGuard } from './guards';
import { ResponseInterceptor } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const adminRoleGuard = app.get(AdminRoleGuard);

  app.setGlobalPrefix('/v1/api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalGuards(adminRoleGuard);
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
