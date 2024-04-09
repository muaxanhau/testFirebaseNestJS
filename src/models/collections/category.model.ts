import { FirestoreBaseModel } from '../base.model';

export type CategoryModel = {
  name: string;
  image: string;
  description: string;
  origin: string;
};
export type CategoryIdModel = FirestoreBaseModel<CategoryModel>;
