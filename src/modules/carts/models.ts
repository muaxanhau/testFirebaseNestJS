import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ItemIdModel } from 'src/models';
import { CartIdModel } from 'src/models/collections/cart.model';
import { Prettify } from 'src/utils';

//=====================================================================================================================
// getCartsByUserId
export type GetCartsByUserIdResponseModel = {
  id: string;
  createdAt: Date;
  paidAt?: Date;
  quantity: number;
  item: ItemIdModel;
}[];

//=====================================================================================================================
// addCart
export class AddCartBodyModel {
  @IsNotEmpty()
  @IsString()
  itemId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
export type AddCartResponseModel = CartIdModel;
