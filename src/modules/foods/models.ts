import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FoodIdModel } from 'src/models';

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
