import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ItemIdModel, UserIdModel } from 'src/models';
import { CartIdModel } from 'src/models/collections/cart.model';

//=====================================================================================================================
// getCartsByUserId
export type GetCartsByUserIdResponseModel<T = {}> = ({
  id: string;
  createdAt: Date;
  paidAt?: Date;
  quantity: number;
  item: ItemIdModel;
} & T)[];

//=====================================================================================================================
// getCartsByUserId
export type GetAllCartsResponseModel = GetCartsByUserIdResponseModel<{
  user: UserIdModel;
}>;

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
