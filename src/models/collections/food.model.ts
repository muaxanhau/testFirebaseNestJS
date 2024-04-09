import { FirestoreBaseModel } from '../base.model';

export type FoodModel = {
  name: string;
  image: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
};
export type FoodIdModel = FirestoreBaseModel<FoodModel>;
