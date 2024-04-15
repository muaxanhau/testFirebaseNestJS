import { FirestoreBaseModel } from '../base.model';
import { Timestamp } from 'firebase-admin/firestore';

export type CartModel = {
  userId: string;
  itemId: string;
  createdAt: Timestamp;
  paidAt?: Timestamp;
  quantity: number;
};
export type CartIdModel = FirestoreBaseModel<CartModel>;
