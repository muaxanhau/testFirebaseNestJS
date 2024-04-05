import { Injectable } from '@nestjs/common';
import {
  restaurantAndFoodsCollection,
  restaurantsCollection,
} from './firebase';
import { RestaurantAndFoodsModel, RestaurantModel } from 'src/models';

@Injectable()
export class RestaurantsService {
  async addRestaurant(data: RestaurantModel) {
    const restaurant = await restaurantsCollection.add(data);
    return restaurant;
  }

  async addFood(data: RestaurantAndFoodsModel) {
    const restaurantAndFoods = await restaurantAndFoodsCollection.add(data);
    return restaurantAndFoods;
  }

  async getAllRestaurants() {
    const restaurants = await restaurantsCollection.getAll();
    return restaurants;
  }
}
