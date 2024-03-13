import { Controller, Get } from '@nestjs/common';
import { ItemsService } from 'src/services';

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAllItems() {
    return this.itemsService.getAllItems();
  }
}
