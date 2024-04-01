import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  GetCategoryWithAllItemsResponseModel,
  GetCategoryWithAllItemsParamModel,
} from './models';
import { NoRoleGuard } from 'src/decorators';

@Controller('/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly itemsService: ItemsService,
  ) {}

  @NoRoleGuard()
  @Get()
  async getAllCategories(): Promise<GetAllCategoriesResponseModel> {
    const data = await this.categoriesService.getAllCategories();
    return data;
  }

  @NoRoleGuard()
  @Get(':id/items')
  async getCategoryWithAllItems(
    @Param() param: GetCategoryWithAllItemsParamModel,
  ): Promise<GetCategoryWithAllItemsResponseModel> {
    const { id } = param;
    const category = await this.categoriesService.getCategory(id);
    const { items } = await this.itemsService.getItemsByCategoryId(id);

    const categoryWithItems: GetCategoryWithAllItemsResponseModel = {
      ...category,
      items,
    };

    return categoryWithItems;
  }

  @NoRoleGuard()
  @Get('/items')
  async getAllCategoriesWithItems(): Promise<GetAllCategoriesWithItemsResponseModel> {
    const categories = await this.categoriesService.getAllCategories();
    const items = await this.itemsService.getAllItems();

    const categoriesWithItems: GetAllCategoriesWithItemsResponseModel =
      categories.map((category) => ({
        ...category,
        items: items
          .filter((item) => item.categoryId === category.id)
          .map((item) => {
            const { categoryId, ...onlyItem } = item;
            return onlyItem;
          }),
      }));

    return categoriesWithItems;
  }

  @NoRoleGuard()
  @Get(':id')
  async getCategory(
    @Param() param: GetCategoryByIdParamModel,
  ): Promise<GetCategoryByIdResponseModel> {
    const { id } = param;
    const data = await this.categoriesService.getCategory(id);
    return data;
  }

  @Post()
  async addCategory(
    @Body() body: AddCategoryBodyModel,
  ): Promise<AddCategoryResponseModel> {
    const data = await this.categoriesService.addCategory(body);
    return data;
  }

  @Delete(':id')
  async deleteCategory(
    @Param() param: DeleteCategoryParamModel,
  ): Promise<DeleteCategoryResponseModel> {
    const { id } = param;
    await this.categoriesService.deleteCategory(id);
    await this.itemsService.deleteAllItemsByCategoryId(id);
    return null;
  }

  @Put(':id')
  async updateCategory(
    @Param() param: UpdateCategoryParamModel,
    @Body() body: UpdateCategoryBodyModel,
  ): Promise<UpdateCategoryResponseModel> {
    const { id } = param;
    await this.categoriesService.updateCategory(id, body);
    return null;
  }
}
