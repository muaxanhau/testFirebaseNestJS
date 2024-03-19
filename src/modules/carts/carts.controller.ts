import {
  BadRequestException,
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
import { tokenName } from 'src/config';
import { NoRoleGuard } from 'src/decorators';
import { exceptionUtils } from 'src/utils';

@Controller('/carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  @NoRoleGuard()
  @Get()
  async getCartsByUserId(
    @Headers() headers: HeadersBaseModel,
  ): Promise<GetCartsByUserIdResponseModel> {
    const token = headers[tokenName];
    const userId = (await this.usersService.getUserIdFromToken(token))!;
    const carts = await this.cartsService.getCartsByUserId(userId);
    const items = await this.itemsService.getAllItems();

    const response = carts.map((rawCart) => {
      const { userId, itemId, ...cart } = rawCart;
      const rawItem = items.filter((item) => item.id === itemId)?.[0];
      const createdAt = cart.createdAt.toDate();
      const paidAt = cart.paidAt?.toDate();

      return {
        ...cart,
        item: rawItem,
        createdAt,
        paidAt,
      };
    });
    return response;
  }

  @NoRoleGuard()
  @Post()
  async addCart(
    @Headers() headers: HeadersBaseModel,
    @Body() body: AddCartBodyModel,
  ): Promise<AddCartResponseModel> {
    const token = headers[tokenName];
    const { itemId, quantity } = body;

    const item = await this.itemsService.getItem(itemId);
    if (!item) {
      exceptionUtils.notFound();
    }

    const userId = (await this.usersService.getUserIdFromToken(token))!;

    const newCart = await this.cartsService.addCart(userId, itemId, quantity);
    return newCart;
  }
}
