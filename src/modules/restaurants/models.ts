import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RestaurantIdModel } from 'src/models';

//=====================================================================================================================
// addRestaurant
export class AddRestaurantBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @IsNotEmpty()
  @IsString()
  openAt: string;

  @IsNotEmpty()
  @IsString()
  closeAt: string;
}
export type AddRestaurantResponseModel = RestaurantIdModel;

//=====================================================================================================================
// getAllRestaurants
export type GetAllRestaurantsResponseModel = RestaurantIdModel[];
