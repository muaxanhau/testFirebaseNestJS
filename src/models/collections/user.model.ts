import { FirestoreIdBaseModel } from '../base.model';
import { RoleEnum } from '../enums';

export type UserModel = {
  role: RoleEnum;
};
export type UserIdModel = FirestoreIdBaseModel<UserModel>;
