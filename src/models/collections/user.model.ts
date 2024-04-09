import { FirestoreBaseModel } from '../base.model';
import { RoleEnum } from '../enums';

export type UserModel = {
  role: RoleEnum;
};
export type UserIdModel = FirestoreBaseModel<UserModel>;
