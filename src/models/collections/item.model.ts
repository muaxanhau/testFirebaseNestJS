import { FirestoreBaseModel } from '../base.model';

export type ItemModel = {
  name: string;
  color?: string;
  categoryId: string;
};
export type ItemIdModel = FirestoreBaseModel<ItemModel>;
