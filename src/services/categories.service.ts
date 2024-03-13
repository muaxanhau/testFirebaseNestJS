import { Injectable } from '@nestjs/common';
import { categoriesCollection } from 'src/services/firebase';
import { CategoryModel, CategoryIdModel } from 'src/models';

@Injectable()
export class CategoriesService {
  async getAllCategories() {
    const rawCategories = await categoriesCollection.get();
    const categories: CategoryIdModel[] = rawCategories.docs.map(
      (category) => ({
        id: category.id,
        ...(category.data() as CategoryModel),
      }),
    );

    return categories;
  }

  async getCategory(id: string) {
    const rawCategory = await categoriesCollection.doc(id).get();
    const category: CategoryIdModel = {
      id: rawCategory.id,
      ...(rawCategory.data() as CategoryModel),
    };

    return category;
  }

  async addCategory(category: CategoryModel) {
    const response = await categoriesCollection.add(category);
    const rawCategory = await response.get();
    const newCategory: CategoryIdModel = {
      id: rawCategory.id,
      ...(rawCategory.data() as CategoryModel),
    };

    return newCategory;
  }

  async deleteCategory(id: string) {
    await categoriesCollection.doc(id).delete();
  }

  async updateCategory(id: string, data: CategoryModel) {
    await categoriesCollection.doc(id).update(data);
  }
}
