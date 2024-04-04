import { Injectable } from '@nestjs/common';
import { subCategoriesCollection } from './firebase';
import { SubCategoryIdModel, SubCategoryModel } from 'src/models';
import { FoodsService } from './foods.service';

@Injectable()
export class SubCategoriesService {
  constructor(private readonly foodsService: FoodsService) {}

  async addSubCategory(data: SubCategoryModel) {
    const response = await subCategoriesCollection.add(data);
    const rawSubCategory = await response.get();
    const subCategory: SubCategoryIdModel = {
      id: rawSubCategory.id,
      ...(rawSubCategory.data() as SubCategoryModel),
    };
    return subCategory;
  }

  async getAllSubCategories({
    restaurantId,
    categoryId,
  }: GetAllSubCategoriesProps) {
    const rawSubCategories = await subCategoriesCollection.get();
    const subCategories: SubCategoryIdModel[] = rawSubCategories.docs.map(
      (subCategory) => ({
        id: subCategory.id,
        ...(subCategory.data() as SubCategoryModel),
      }),
    );

    if (!restaurantId && !categoryId) {
      return subCategories;
    }

    if (restaurantId && !categoryId) {
      const foods = await this.foodsService.getAllFoodsBy({ restaurantId });
      const subCategoriesId = foods.map((food) => food.subCategoryId);
      const filteredSubCategories = subCategories.filter((subCategory) =>
        subCategoriesId.includes(subCategory.id),
      );
      return filteredSubCategories;
    }

    if (!restaurantId && categoryId) {
      const foods = await this.foodsService.getAllFoodsBy({ categoryId });
      const subCategoriesId = foods.map((food) => food.subCategoryId);
      const filteredSubCategories = subCategories.filter((subCategory) =>
        subCategoriesId.includes(subCategory.id),
      );
      return filteredSubCategories;
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
