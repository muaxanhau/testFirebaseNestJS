import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SubCategoryIdModel } from 'src/models';

//=====================================================================================================================
// addRestaurant
export class AddSubCategoryBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
export type AddSubCategoryResponseModel = SubCategoryIdModel;

//=====================================================================================================================
// getAllRestaurants
export class GetAllSubCategoriesQueryModel {
  @IsOptional()
  @IsString()
  restaurantId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
export type GetAllSubCategoriesResponseModel = SubCategoryIdModel[];
