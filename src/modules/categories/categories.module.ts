import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService, FoodsService, ItemsService } from 'src/services';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ItemsService, FoodsService],
})
export class CategoriesModule {}
