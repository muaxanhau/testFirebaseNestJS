import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService, ItemsService } from 'src/services';
import {
  AddItemBody,
  AddItemResponseModel,
  DeleteItemParamModel,
  DeleteItemResponseModel,
  GetAllItemsByCategoryIdQueryModel,
  GetAllItemsByCategoryIdResponseModel,
  GetAllItemsResponseModel,
} from './models';
import { NoRoleGuard } from 'src/decorators';
import { exceptionUtils } from 'src/utils';

@Controller('/items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @NoRoleGuard()
  @Get()
  async getAllItemsByCategoryId(
    @Query() query: GetAllItemsByCategoryIdQueryModel,
    @Query('page', ParseIntPipe) page?: number,
  ): Promise<GetAllItemsByCategoryIdResponseModel> {
    const { categoryId } = query;
    const data = await this.itemsService.getItemsByCategoryId(categoryId, page);
    return data;
  }

  @NoRoleGuard()
  @Get()
  async getAllItems(): Promise<GetAllItemsResponseModel> {
    const data = await this.itemsService.getAllItems();
    return data;
  }

  @Post()
  async addItem(@Body() body: AddItemBody): Promise<AddItemResponseModel> {
    const { categoryId, ...item } = body;

    const existed = await this.categoriesService.exist(categoryId);
    if (!existed) {
      exceptionUtils.notFound();
    }

    const newItem = await this.itemsService.addItem({ ...item, categoryId });
    return newItem;
  }

  @Delete(':id')
  async deleteItem(
    @Param() param: DeleteItemParamModel,
  ): Promise<DeleteItemResponseModel> {
    const { id } = param;
    await this.itemsService.deleteItem(id);

    return null;
  }
}
