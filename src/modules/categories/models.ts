import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryIdModel, ItemIdModel } from 'src/models';
import { Prettify } from 'src/utils';

//=====================================================================================================================
// getAllCategories
export type GetAllCategoriesResponseModel = CategoryIdModel[];

//=====================================================================================================================
// getCategoryWithAllItems
export class GetCategoryWithAllItemsParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export type GetCategoryWithAllItemsResponseModel = Prettify<
  CategoryIdModel & {
    items: Omit<ItemIdModel, 'categoryId'>[];
  }
>;

//=====================================================================================================================
// getAllCategoriesWithItems
export type GetAllCategoriesWithItemsResponseModel =
  GetCategoryWithAllItemsResponseModel[];

//=====================================================================================================================
// getCategory
export class GetCategoryByIdParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export type GetCategoryByIdResponseModel = CategoryIdModel;

//=====================================================================================================================
// addCategory
export class AddCategoryBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  origin: string;
}
export type AddCategoryResponseModel = CategoryIdModel;

//=====================================================================================================================
// deleteCategory
export class DeleteCategoryParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export type DeleteCategoryResponseModel = null;

//=====================================================================================================================
// updateCategory
export class UpdateCategoryParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export class UpdateCategoryBodyModel extends AddCategoryBodyModel {}
export type UpdateCategoryResponseModel = null;
