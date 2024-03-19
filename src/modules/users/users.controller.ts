import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UsersService } from 'src/services';
import {
  AddUserBodyModel,
  AddUserResponseModel,
  GetUserSelfResponseModel,
} from './models';
import { HeadersBaseModel } from 'src/models';
import { NoRoleGuard } from 'src/decorators';
import { config } from 'src/config';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @NoRoleGuard()
  @Post()
  async addUser(@Body() body: AddUserBodyModel): Promise<AddUserResponseModel> {
    const { id, ...newUser } = body;
    const user = await this.usersService.addUser(id, newUser);
    return user;
  }

  @NoRoleGuard()
  @Get('/self')
  async getUserSelf(
    @Headers() headers: HeadersBaseModel,
  ): Promise<GetUserSelfResponseModel> {
    const token = headers[config.tokenName];

    const user = (await this.usersService.getUserFromToken(token))!;
    return user;
  }
}
