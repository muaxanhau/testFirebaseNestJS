import { FirestoreBaseModel } from '../base.model';
import { StatusFoodEnum } from '../enums';

export type StatusFoodModel = {
  userId: string;
  foodId: string;
  status: StatusFoodEnum;
};
export type StatusFoodIdModel = FirestoreBaseModel<StatusFoodModel>;
