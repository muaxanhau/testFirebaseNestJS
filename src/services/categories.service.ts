import { Injectable } from '@nestjs/common';
import { categoriesCollection } from 'src/services/firebase';
import { CategoryModel, deletedLine } from 'src/models';
import { FoodsService } from './foods.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly foodsService: FoodsService) {}

  async exist(id: string) {
    const existed = categoriesCollection.exist(id);
    return existed;
  }

  async getAll({ restaurantId }: GetAllCategoriesProps) {
    const categories = await categoriesCollection.getAll();
    if (!restaurantId) {
      return categories;
    }

    const foods = await this.foodsService.getBy({ restaurantId });
    const categoriesId = foods.map((food) => food.categoryId);
    const filteredCategories = categories.filter((category) =>
      categoriesId.includes(category.id),
    );
    return filteredCategories;
  }

  async get(id: string) {
    const category = await categoriesCollection.get(id);
    return category;
  }

  async add(data: CategoryModel) {
    const category = await categoriesCollection.add(data);
    return category;
  }

  async delete(id: string) {
    await categoriesCollection.delete(id);
  }

  async update(id: string, data: CategoryModel) {
    await categoriesCollection.edit(id, data);
  }
}

type GetAllCategoriesProps = {
  restaurantId?: string;
};
