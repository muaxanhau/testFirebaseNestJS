//=====================================================================================================================

import { IsNotEmpty, IsString } from 'class-validator';
import { CartIdModel } from 'src/models/collections/cart.model';

// addCart
export class AddCartHeadersModel {
  @IsNotEmpty()
  @IsString()
  ['firebase-token']: string;
}
export class AddCartBodyModel {
  @IsNotEmpty()
  @IsString()
  itemId: string;
}
export type AddCartResponseModel = CartIdModel;
