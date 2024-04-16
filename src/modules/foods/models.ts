import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  FoodIdModel,
  RoleEnum,
  StatusFoodEnum,
  StatusFoodIdModel,
} from 'src/models';

//=====================================================================================================================
// addFood
export class AddFoodBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  subCategoryId: string;
}
export type AddFoodResponseModel = FoodIdModel;

//=====================================================================================================================
// getAllFoodsByQuery
export class GetAllFoodsByQueryQueryModel {
  @IsString()
  @IsOptional()
  restaurantId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  subCategoryId?: string;
}
export type GetAllFoodsByQueryResponseModel = FoodIdModel[];

//=====================================================================================================================
// addFoodSession
export class AddFoodSessionBodyModel {
  @IsString()
  @IsNotEmpty()
  foodId: string;
}
export type AddFoodSessionResponseModel = StatusFoodIdModel;

//=====================================================================================================================
// getFoodSessions
export type GetFoodSessionsResponseModel = {
  id: string;
  status: StatusFoodEnum;
  food: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    role: RoleEnum;
  };
}[];

//=====================================================================================================================
// updateFoodSession
export class UpdateFoodSessionParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export type UpdateFoodSessionResponseModel = null;

//=====================================================================================================================
// generateStripePaymentUrl
export class GenerateStripePaymentUrlParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export type GenerateStripePaymentUrlResponseModel = {
  url: string | null;
};
