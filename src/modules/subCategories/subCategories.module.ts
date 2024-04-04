import { Module } from '@nestjs/common';
import { FoodsService, SubCategoriesService } from 'src/services';
import { SubCategoriesController } from './subCategories.controller';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, FoodsService],
})
export class SubCategoriesModule {}
