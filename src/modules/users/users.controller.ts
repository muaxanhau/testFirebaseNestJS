import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UserIdModel } from 'src/models';
import { UsersService } from 'src/services';
import {
  AddUserBodyModel,
  AddUserResponseModel,
  GetUserSelfHeadersModel,
  GetUserSelfResponseModel,
} from './models';
import { utils } from 'src/utils';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(@Body() body: AddUserBodyModel): Promise<AddUserResponseModel> {
    const { id, ...user } = body;
    await this.usersService.addUser(id, user);
    return null;
  }

  @Get('/self')
  async getUserSelf(
    @Headers() headers: GetUserSelfHeadersModel,
  ): Promise<GetUserSelfResponseModel> {
    const token = headers['firebase-token'];

    const id = await this.usersService.getUserIdFromToken(token);
    const user = await this.usersService.getUser(id);
    return user;
  }
}
