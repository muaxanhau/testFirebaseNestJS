import { Injectable } from '@nestjs/common';
import {
  restaurantAndFoodsCollection,
  restaurantsCollection,
} from './firebase';
import {
  RestaurantAndFoodsIdModel,
  RestaurantAndFoodsModel,
  RestaurantIdModel,
  RestaurantModel,
} from 'src/models';

@Injectable()
export class RestaurantsService {
  async addRestaurant(data: RestaurantModel) {
    const response = await restaurantsCollection.add(data);
    const rawRestaurant = await response.get();
    const restaurant: RestaurantIdModel = {
      id: rawRestaurant.id,
      ...(rawRestaurant.data() as RestaurantModel),
    };
    return restaurant;
  }

  async addFood(data: RestaurantAndFoodsModel) {
    const response = await restaurantAndFoodsCollection.add(data);
    const rawRestaurantAndFoods = await response.get();
    const restaurantAndFoods: RestaurantAndFoodsIdModel = {
      id: rawRestaurantAndFoods.id,
      ...(rawRestaurantAndFoods.data() as RestaurantAndFoodsModel),
    };
    return restaurantAndFoods;
  }

  async getAllRestaurants() {
    const rawRestaurants = await restaurantsCollection.get();
    const restaurants: RestaurantIdModel[] = rawRestaurants.docs.map(
      (restaurant) => ({
        id: restaurant.id,
        ...(restaurant.data() as RestaurantModel),
      }),
    );

    return restaurants;
  }
}
