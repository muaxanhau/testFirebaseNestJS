import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryIdModel, ItemIdModel } from 'src/models';
import { Prettify } from 'src/utils';

//=====================================================================================================================
// getAllCategories
export type GetAllCategoriesResponseModel = CategoryIdModel[];

//=====================================================================================================================
// getAllCategoriesWithItems
export type GetAllCategoriesWithItemsResponseModel = Prettify<
  CategoryIdModel & {
    items: Omit<ItemIdModel, 'categoryId'>[];
  }
>[];

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

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
export type AddCategoryResponseModel = CategoryIdModel;

//=====================================================================================================================
// deleteCategory
export class DeleteCategoryParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export type DeleteCategoryResponseModel = void;

//=====================================================================================================================
// updateCategory
export class UpdateCategoryParamModel {
  @IsNotEmpty()
  @IsString()
  id: string;
}
export class UpdateCategoryBodyModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
export type UpdateCategoryResponseModel = void;
