import { Module } from '@nestjs/common';
import { SubCategoriesService } from 'src/services';
import { SubCategoriesController } from './subCategories.controller';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
})
export class SubCategoriesModule {}
