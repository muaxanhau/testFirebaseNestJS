import { FirestoreIdBaseModel } from '../base.model';

export type CartModel = {
  userId: string;
  itemId: string;
  createdAt: Date;
  paidAt?: Date;
  quantity: number;
};
export type CartIdModel = FirestoreIdBaseModel<CartModel>;
