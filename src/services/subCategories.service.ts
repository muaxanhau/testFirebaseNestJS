import { Injectable } from '@nestjs/common';
import { subCategoriesCollection } from './firebase';
import { SubCategoryIdModel, SubCategoryModel } from 'src/models';

@Injectable()
export class SubCategoriesService {
  async addSubCategory(data: SubCategoryModel) {
    const response = await subCategoriesCollection.add(data);
    const rawSubCategory = await response.get();
    const subCategory: SubCategoryIdModel = {
      id: rawSubCategory.id,
      ...(rawSubCategory.data() as SubCategoryModel),
    };
    return subCategory;
  }

  async getAllSubCategories() {
    const rawSubCategories = await subCategoriesCollection.get();
    const subCategories: SubCategoryIdModel[] = rawSubCategories.docs.map(
      (subCategory) => ({
        id: subCategory.id,
        ...(subCategory.data() as SubCategoryModel),
      }),
    );

    return subCategories;
  }
}
