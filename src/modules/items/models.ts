import { Optional } from '@nestjs/common';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsAlphanumeric,
  ValidateIf,
  IsInt,
} from 'class-validator';
import {
  ItemIdModel,
  ItemModel,
  PaginationResponseBaseModel,
} from 'src/models';
import { Prettify } from 'src/utils';

//=====================================================================================================================
// getAllItems
export type GetAllItemsResponseModel = ItemIdModel[];

//=====================================================================================================================
// getAllItemsByCategoryId
export class GetAllItemsByCategoryIdQueryModel {
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
export type GetAllItemsByCategoryIdResponseModel = PaginationResponseBaseModel<{
  items: ItemIdModel[];
}>;

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

//=====================================================================================================================
// deleteItem
export class DeleteItemParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export type DeleteItemResponseModel = null;
