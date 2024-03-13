import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryModel } from 'src/models';
import { CategoriesService, ItemsService } from 'src/services';
import {
  AddCategoryResponseModel,
  DeleteCategoryResponseModel,
  UpdateCategoryResponseModel,
  GetAllCategoriesResponseModel,
  GetAllCategoriesWithItemsResponseModel,
  GetCategoryByIdResponseModel,
  GetCategoryByIdParamModel,
  AddCategoryBodyModel,
  DeleteCategoryParamModel,
  UpdateCategoryParamModel,
  UpdateCategoryBodyModel,
} from './models';

@Controller('/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly itemsService: ItemsService,
  ) {}

  @Get()
  getAllCategories(): Promise<GetAllCategoriesResponseModel> {
    return this.categoriesService.getAllCategories();
  }

  @Get('/items')
  async getAllCategoriesWithItems(): Promise<GetAllCategoriesWithItemsResponseModel> {
    const categories = await this.categoriesService.getAllCategories();
    const items = await this.itemsService.getAllItems();

    const categoriesWithItems: GetAllCategoriesWithItemsResponseModel =
      categories.map((category) => ({
        ...category,
        items: items
          .filter((item) => item.categoryId.id === category.id)
          .map((item) => {
            const { categoryId, ...onlyItem } = item;
            return onlyItem;
          }),
      }));

    return categoriesWithItems;
  }

  @Get(':id')
  getCategory(
    @Param() param: GetCategoryByIdParamModel,
  ): Promise<GetCategoryByIdResponseModel> {
    const { id } = param;
    return this.categoriesService.getCategory(id);
  }

  @Post()
  addCategory(
    @Body() body: AddCategoryBodyModel,
  ): Promise<AddCategoryResponseModel> {
    return this.categoriesService.addCategory(body);
  }

  @Delete(':id')
  deleteCategory(
    @Param() param: DeleteCategoryParamModel,
  ): Promise<DeleteCategoryResponseModel> {
    const { id } = param;
    return this.categoriesService.deleteCategory(id);
  }

  @Put(':id')
  updateCategory(
    @Param() param: UpdateCategoryParamModel,
    @Body() body: UpdateCategoryBodyModel,
  ): Promise<UpdateCategoryResponseModel> {
    const { id } = param;
    return this.categoriesService.updateCategory(id, body);
  }
}
