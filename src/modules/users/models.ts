import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum, UserIdModel } from 'src/models';

//=====================================================================================================================
// addUser
export class AddUserBodyModel {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
export type AddUserResponseModel = UserIdModel;

//=====================================================================================================================
// getUserSelf
export class GetUserSelfHeadersModel {
  @IsNotEmpty()
  @IsString()
  ['firebase-token']: string;
}
export type GetUserSelfResponseModel = UserIdModel;
