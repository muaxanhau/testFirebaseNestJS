import { Module } from '@nestjs/common';
import { FoodsService, RestaurantsService } from 'src/services';
import { RestaurantsController } from './restaurants.controller';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService, FoodsService],
})
export class RestaurantsModule {}
