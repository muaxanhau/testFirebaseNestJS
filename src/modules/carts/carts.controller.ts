import {
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CartsService, ItemsService, UsersService } from 'src/services';
import {
  AddCartBodyModel,
  AddCartHeadersModel,
  AddCartResponseModel,
} from './models';

@Controller('/carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async addCart(
    @Headers() headers: AddCartHeadersModel,
    @Body() body: AddCartBodyModel,
  ): Promise<AddCartResponseModel> {
    const token = headers['firebase-token'];
    const { itemId } = body;

    const item = await this.itemsService.getItem(itemId);
    if (!item) throw new NotFoundException('Item not found.');

    const userId = await this.usersService.getUserIdFromToken(token);

    const newCart = await this.cartsService.addCart(userId, itemId);
    return newCart;
  }
}
