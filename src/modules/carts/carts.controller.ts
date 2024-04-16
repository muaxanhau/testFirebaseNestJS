import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CartsService, ItemsService, UsersService } from 'src/services';
import {
  AddCartBodyModel,
  AddCartResponseModel,
  GetAllCartsResponseModel,
  GetCartsByUserIdResponseModel,
} from './models';
import { HeadersBaseModel } from 'src/models';
import { config } from 'src/config';
import { NoRoleGuard } from 'src/decorators';
import { exceptionUtils } from 'src/utils';

@Controller('/carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/all')
  async getAllCarts(): Promise<GetAllCartsResponseModel> {
    const carts = await this.cartsService.getAll();
    const items = await this.itemsService.getAll();
    const users = await this.usersService.getAll();

    const response: GetAllCartsResponseModel = carts.map((rawCart) => {
      const { userId, itemId, ...cart } = rawCart;
      const item = items.filter((item) => item.id === itemId)?.[0];
      const user = users.filter((user) => user.id === userId)?.[0];
      const createdAt = cart.createdAt.toDate();
      const paidAt = cart.paidAt?.toDate();

      return { ...cart, item, createdAt, paidAt, user };
    });

    return response;
  }

  @NoRoleGuard()
  @Get()
  async getCartsByUserId(
    @Headers() headers: HeadersBaseModel,
  ): Promise<GetCartsByUserIdResponseModel> {
    const token = headers[config.tokenName];
    const userId = (await this.usersService.getUserIdByToken(token))!;
    const carts = await this.cartsService.getBy({ userId });
    const items = await this.itemsService.getAll();

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
    const token = headers[config.tokenName];
    const { itemId, quantity } = body;

    const item = await this.itemsService.get(itemId);
    if (!item) {
      exceptionUtils.notFound();
    }

    const userId = (await this.usersService.getUserIdByToken(token))!;

    const newCart = await this.cartsService.add(userId, itemId, quantity);
    return newCart;
  }
}
