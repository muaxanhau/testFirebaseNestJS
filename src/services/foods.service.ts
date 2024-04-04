import { Injectable } from '@nestjs/common';
import { foodsCollection, restaurantAndFoodsCollection } from './firebase';
import { FoodIdModel, FoodModel, RestaurantAndFoodsModel } from 'src/models';

@Injectable()
export class FoodsService {
  async addFood(data: FoodModel) {
    const response = await foodsCollection.add(data);
    const rawFood = await response.get();
    const food: FoodIdModel = {
      id: rawFood.id,
      ...(rawFood.data() as FoodModel),
    };
    return food;
  }

  async getAllFoods() {
    const rawFoods = await foodsCollection.get();
    const foods: FoodIdModel[] = rawFoods.docs.map((food) => ({
      id: food.id,
      ...(food.data() as FoodModel),
    }));

    return foods;
  }

  async getAllFoodsBy({
    restaurantId,
    categoryId,
    subCategoryId,
  }: GetAllFoodsByProps) {
    const rawRestaurantFilteredId = restaurantId
      ? restaurantAndFoodsCollection.where('restaurantId', '==', restaurantId)
      : restaurantAndFoodsCollection;
    const rawRestaurant = await rawRestaurantFilteredId.get();
    const restaurantAndFoods = rawRestaurant.docs.map((restaurantAndFoods) => ({
      id: restaurantAndFoods.id,
      ...(restaurantAndFoods.data() as RestaurantAndFoodsModel),
    }));

    const foodsId = restaurantAndFoods.map((food) => food.foodId);

    const rawFoodsFilteredCategory = categoryId
      ? foodsCollection.where('categoryId', '==', categoryId)
      : foodsCollection;
    const rawFoodsFilteredSubCategory = subCategoryId
      ? rawFoodsFilteredCategory.where('subCategoryId', '==', subCategoryId)
      : rawFoodsFilteredCategory;
    const rawFoods = await rawFoodsFilteredSubCategory.get();

    const foods: FoodIdModel[] = rawFoods.docs.map((food) => ({
      id: food.id,
      ...(food.data() as FoodModel),
    }));

    const filteredFoods = foods.filter((food) => foodsId.includes(food.id));
    return filteredFoods;
  }
}

type GetAllFoodsByProps = {
  restaurantId?: string;
  categoryId?: string;
  subCategoryId?: string;
};
