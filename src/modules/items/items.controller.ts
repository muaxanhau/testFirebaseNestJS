import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ItemsService } from 'src/services';
import {
  AddItemBody,
  AddItemResponseModel,
  DeleteItemParamModel,
  DeleteItemResponseModel,
  GetAllItemsResponseModel,
} from './models';
import { categoriesCollection } from 'src/services/firebase';
import { NoRoleGuard } from 'src/decorators';
import { exceptionUtils } from 'src/utils';

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @NoRoleGuard()
  @Get()
  async getAllItems(): Promise<GetAllItemsResponseModel> {
    const data = await this.itemsService.getAllItems();
    return data;
  }

  @Post()
  async addItem(@Body() body: AddItemBody): Promise<AddItemResponseModel> {
    const { categoryId, ...item } = body;

    const rawCategory = await categoriesCollection.doc(categoryId).get();
    if (!rawCategory.exists) {
      exceptionUtils.notFound();
    }

    const newItem = await this.itemsService.addItem({
      ...item,
      categoryId: rawCategory.id,
    });

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
