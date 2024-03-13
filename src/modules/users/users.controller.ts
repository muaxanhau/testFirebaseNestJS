import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UserIdModel } from 'src/models';
import { UsersService } from 'src/services';
import {
  AddUserBodyModel,
  AddUserResponseModel,
  GetUserSelfHeadersModel,
  GetUserSelfResponseModel,
} from './models';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(@Body() body: AddUserBodyModel): Promise<AddUserResponseModel> {
    const { id, ...user } = body;
    return this.usersService.addUser(id, user);
  }

  @Get('/self')
  async getUserSelf(
    @Headers() headers: GetUserSelfHeadersModel,
  ): Promise<GetUserSelfResponseModel> {
    const token = headers['firebase-token'];

    const id = await this.usersService.getUserIdFromToken(token);
    return this.usersService.getUser(id);
  }
}
