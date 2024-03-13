import { FirestoreIdBaseModel } from '../base.model';
import { CategoryModel } from './category.model';

export type ItemModel = {
  name: string;
  color: string;
  categoryId: FirebaseFirestore.DocumentReference<CategoryModel>;
};
export type ItemIdModel = FirestoreIdBaseModel<ItemModel>;
