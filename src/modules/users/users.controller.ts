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
import { NoAuthGuard, NoRoleGuard } from 'src/decorators';
import { config } from 'src/config';
import { exceptionUtils } from 'src/utils';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @NoAuthGuard()
  @Post()
  async addUser(@Body() body: AddUserBodyModel): Promise<AddUserResponseModel> {
    const { id, ...newUser } = body;
    const user = await this.usersService.addBy(id, newUser);
    if (!user) return exceptionUtils.notFound();

    return user;
  }

  @NoRoleGuard()
  @Get('/self')
  async getUserSelf(
    @Headers() headers: HeadersBaseModel,
  ): Promise<GetUserSelfResponseModel> {
    const user = (await this.usersService.getUserBy(headers))!;
    return user;
  }

  @NoRoleGuard()
  @Post('/setup')
  async setupUser(
    @Headers() headers: HeadersBaseModel,
    @Body() body: SetupUserBodyModel,
  ): Promise<SetupUserResponseModel> {
    const { deviceId } = body;

    const userId = (await this.usersService.getUserIdBy(headers))!;
    await this.usersService.setDeviceId(userId, deviceId);

    return null;
  }
}
