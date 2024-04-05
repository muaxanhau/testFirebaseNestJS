import { Injectable } from '@nestjs/common';
import { foodsCollection, restaurantAndFoodsCollection } from './firebase';
import { FoodModel } from 'src/models';

@Injectable()
export class FoodsService {
  async addFood(data: FoodModel) {
    const food = await foodsCollection.add(data);
    return food;
  }

  async getAllFoods() {
    const foods = await foodsCollection.getAll();
    return foods;
  }

  async getAllFoodsBy({
    restaurantId,
    categoryId,
    subCategoryId,
  }: GetAllFoodsByProps) {
    const restaurantAndFoods = await restaurantAndFoodsCollection.getBy({
      restaurantId,
    });
    const foods = await foodsCollection.getBy({ categoryId, subCategoryId });

    const foodsId = restaurantAndFoods.map((food) => food.foodId);
    const filteredFoods = foods.filter((food) => foodsId.includes(food.id));
    return filteredFoods;
  }
}

type GetAllFoodsByProps = {
  restaurantId?: string;
  categoryId?: string;
  subCategoryId?: string;
};
