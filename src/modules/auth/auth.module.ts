import { Module } from '@nestjs/common';
import { UsersService } from 'src/services';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UsersService],
})
export class AuthModule {}
