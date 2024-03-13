import { Controller, Get } from '@nestjs/common';
import { ItemsService } from 'src/services';
import { GetAllItemsResponseModel } from './models';

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAllItems(): Promise<GetAllItemsResponseModel> {
    return this.itemsService.getAllItems();
  }
}
