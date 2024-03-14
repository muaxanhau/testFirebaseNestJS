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
  AddCartResponseModel,
  GetCartsByUserIdResponseModel,
} from './models';
import { HeadersBaseModel } from 'src/models';

@Controller('/carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getCartsByUserId(
    @Headers() headers: HeadersBaseModel,
  ): Promise<GetCartsByUserIdResponseModel> {
    const token = headers['firebase-token'];
    const userId = await this.usersService.getUserIdFromToken(token);
    const carts = await this.cartsService.getCartsByUserId(userId);
    const items = await this.itemsService.getAllItems();

    const response = carts.map((rawCart) => {
      const { userId, itemId, ...cart } = rawCart;
      const rawItem = items.filter((item) => item.id === itemId)[0];
      const {} = rawItem;
      return {
        ...cart,
        item: rawItem,
      };
    });
    return response;
  }

  @Post()
  async addCart(
    @Headers() headers: HeadersBaseModel,
    @Body() body: AddCartBodyModel,
  ): Promise<AddCartResponseModel> {
    const token = headers['firebase-token'];
    const { itemId, quantity } = body;

    const item = await this.itemsService.getItem(itemId);
    if (!item) throw new NotFoundException('Item not found.');

    const userId = await this.usersService.getUserIdFromToken(token);

    const newCart = await this.cartsService.addCart(userId, itemId, quantity);
    return newCart;
  }
}
