import { FirestoreIdBaseModel } from '../base.model';

export type CategoryModel = {
  name: string;
  image?: string;
  description?: string;
};
export type CategoryIdModel = FirestoreIdBaseModel<CategoryModel>;
