import { Injectable } from '@nestjs/common';
import { foodsCollection, restaurantAndFoodsCollection } from './firebase';
import { FoodModel } from 'src/models';

type GetAllFoodsByProps = {
  restaurantId?: string;
  categoryId?: string;
  subCategoryId?: string;
};

@Injectable()
export class FoodsService {
  async add(data: FoodModel) {
    const food = await foodsCollection.add(data);
    return food;
  }

  async get(id: string) {
    const food = await foodsCollection.get(id);
    return food;
  }

  async getAll() {
    const foods = await foodsCollection.getAll();
    return foods;
  }

  async getBy({ restaurantId, categoryId, subCategoryId }: GetAllFoodsByProps) {
    const restaurantAndFoods = await restaurantAndFoodsCollection.getBy({
      restaurantId,
    });
    const foods = await foodsCollection.getBy({ categoryId, subCategoryId });

    const foodsId = restaurantAndFoods.map((food) => food.foodId);
    const filteredFoods = foods.filter((food) => foodsId.includes(food.id));
    return filteredFoods;
  }
}
