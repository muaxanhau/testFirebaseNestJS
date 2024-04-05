import { Injectable } from '@nestjs/common';
import { categoriesCollection } from 'src/services/firebase';
import { CategoryModel } from 'src/models';
import { FoodsService } from './foods.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly foodsService: FoodsService) {}

  async exist(id: string) {
    const existed = categoriesCollection.exist(id);
    return existed;
  }

  async getAllCategories({ restaurantId }: GetAllCategoriesProps) {
    const categories = await categoriesCollection.getAll();
    if (!restaurantId) {
      return categories;
    }

    const foods = await this.foodsService.getAllFoodsBy({ restaurantId });
    const categoriesId = foods.map((food) => food.categoryId);
    const filteredCategories = categories.filter((category) =>
      categoriesId.includes(category.id),
    );
    return filteredCategories;
  }

  async getCategory(id: string) {
    const category = await categoriesCollection.get(id);
    return category;
  }

  async addCategory(data: CategoryModel) {
    const category = await categoriesCollection.add(data);
    return category;
  }

  async deleteCategory(id: string) {
    await categoriesCollection.delete(id);
  }

  async updateCategory(id: string, data: CategoryModel) {
    await categoriesCollection.edit(id, data);
  }
}

type GetAllCategoriesProps = {
  restaurantId?: string;
};
