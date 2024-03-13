import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService, ItemsService } from 'src/services';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ItemsService],
})
export class CategoriesModule {}
