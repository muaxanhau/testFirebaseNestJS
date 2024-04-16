import { Module } from '@nestjs/common';
import {
  CategoriesService,
  FoodsService,
  PaymentService,
  PushNotificationService,
  StatusFoodsService,
  SubCategoriesService,
  UsersService,
} from 'src/services';
import { FoodsController } from './foods.controller';

@Module({
  controllers: [FoodsController],
  providers: [
    UsersService,
    FoodsService,
    CategoriesService,
    SubCategoriesService,
    StatusFoodsService,
    PushNotificationService,
    PaymentService,
  ],
})
export class FoodsModule {}
