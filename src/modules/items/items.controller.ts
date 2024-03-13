import { Controller, Get } from '@nestjs/common';
import { ItemsService } from 'src/services';
import { GetAllItemsResponseModel } from './models';

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getAllItems(): Promise<GetAllItemsResponseModel> {
    const data = await this.itemsService.getAllItems();
    return data;
  }
}
