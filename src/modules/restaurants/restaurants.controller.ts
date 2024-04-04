import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoodsService, RestaurantsService } from 'src/services';
import {
  AddRestaurantBodyModel,
  AddRestaurantResponseModel,
  GetAllRestaurantsResponseModel,
} from './models';
import { NoRoleGuard } from 'src/decorators';
import { dummyRestaurants, dummyRestaurantFoods } from 'src/utils';

@Controller('/restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly foodsService: FoodsService,
  ) {}

  @Post('/dummies')
  async addDummiesRestaurants() {
    await Promise.all(
      dummyRestaurants.map((restaurant) =>
        this.restaurantsService.addRestaurant(restaurant),
      ),
    );

    const restaurants = await this.restaurantsService.getAllRestaurants();
    const allFoods = await this.foodsService.getAllFoods();
    await Promise.all(
      restaurants.map(({ id: restaurantId, name }) => {
        const { foods } = dummyRestaurantFoods.filter(
          (res) => res.name === name,
        )[0];

        return Promise.all(
          foods.map((foodName) => {
            const { id: foodId } = allFoods.filter(
              (food) => food.name === foodName,
            )[0];
            return this.restaurantsService.addFood({ restaurantId, foodId });
          }),
        );
      }),
    );

    return null;
  }

  @Post()
  async addRestaurant(
    @Body() body: AddRestaurantBodyModel,
  ): Promise<AddRestaurantResponseModel> {
    const data = await this.restaurantsService.addRestaurant(body);
    return data;
  }

  @NoRoleGuard()
  @Get()
  async getAllRestaurants(): Promise<GetAllRestaurantsResponseModel> {
    const data = await this.restaurantsService.getAllRestaurants();
    return data;
  }
}
