import { Module } from '@nestjs/common';
import { CartsService, ItemsService, UsersService } from 'src/services';
import { CartsController } from './carts.controller';

@Module({
  controllers: [CartsController],
  providers: [CartsService, ItemsService, UsersService],
})
export class CartsModule {}
