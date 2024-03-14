import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ItemIdModel, ItemModel } from 'src/models';
import { Prettify } from 'src/utils';

//=====================================================================================================================
// getAllItems
export type GetAllItemsResponseModel = ItemIdModel[];

//=====================================================================================================================
// addItem
export class AddItemBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
export type AddItemResponseModel = ItemIdModel;
