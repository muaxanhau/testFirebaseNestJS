import { IsNotEmpty, IsString } from 'class-validator';
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
export type GetAllSubCategoriesResponseModel = SubCategoryIdModel[];
