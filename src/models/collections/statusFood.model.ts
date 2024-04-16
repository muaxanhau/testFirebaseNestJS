import { FirestoreBaseModel } from '../base.model';
import { StatusFoodEnum } from '../enums';

export type StatusFoodModel = {
  userId: string;
  foodId: string;
  status: StatusFoodEnum;
  paymentId: string;
};
export type StatusFoodIdModel = FirestoreBaseModel<StatusFoodModel>;
