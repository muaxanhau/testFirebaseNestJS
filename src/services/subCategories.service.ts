import { Injectable } from '@nestjs/common';
import { subCategoriesCollection } from './firebase';
import { SubCategoryModel } from 'src/models';
import { FoodsService } from './foods.service';

@Injectable()
export class SubCategoriesService {
  constructor(private readonly foodsService: FoodsService) {}

  async addSubCategory(data: SubCategoryModel) {
    const subCategory = await subCategoriesCollection.add(data);
    return subCategory;
  }

  async getAllSubCategories({
    restaurantId,
    categoryId,
  }: GetAllSubCategoriesProps) {
    const subCategories = await subCategoriesCollection.getAll();

    if (!restaurantId && !categoryId) {
      return subCategories;
    }

    const foods = await this.foodsService.getAllFoodsBy({
      restaurantId,
      categoryId,
    });
    const subCategoriesId = foods.map((food) => food.subCategoryId);
    const filteredSubCategories = subCategories.filter((subCategory) =>
      subCategoriesId.includes(subCategory.id),
    );
    return filteredSubCategories;
  }
}

type GetAllSubCategoriesProps = {
  restaurantId?: string;
  categoryId?: string;
};
