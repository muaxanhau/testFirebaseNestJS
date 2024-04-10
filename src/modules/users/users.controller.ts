import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UsersService } from 'src/services';
import {
  AddUserBodyModel,
  AddUserResponseModel,
  GetUserSelfResponseModel,
  SetupUserBodyModel,
  SetupUserResponseModel,
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

  @NoRoleGuard()
  @Post('/setup')
  async setupUser(
    @Headers() headers: HeadersBaseModel,
    @Body() body: SetupUserBodyModel,
  ): Promise<SetupUserResponseModel> {
    const token = headers[config.tokenName];
    const { deviceId } = body;

    const userId = (await this.usersService.getUserIdFromToken(token))!;
    await this.usersService.setDeviceId(userId, deviceId);

    return null;
  }
}
