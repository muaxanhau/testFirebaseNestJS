import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { CategoriesService, FoodsService, ItemsService } from 'src/services';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, CategoriesService, FoodsService],
})
export class ItemsModule {}
