import { Module } from '@nestjs/common';
import {
  CategoriesService,
  FoodsService,
  SubCategoriesService,
} from 'src/services';
import { FoodsController } from './food.controller';

@Module({
  controllers: [FoodsController],
  providers: [FoodsService, CategoriesService, SubCategoriesService],
})
export class FoodsModule {}
