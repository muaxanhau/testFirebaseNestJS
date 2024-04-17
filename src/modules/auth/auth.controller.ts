import { Controller, Get, Headers } from '@nestjs/common';
import { UsersService } from 'src/services';
import { LogoutResponseModel } from './models';
import { HeadersBaseModel } from 'src/models';
import { config } from 'src/config';
import { NoRoleGuard } from 'src/decorators';

@Controller('/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @NoRoleGuard()
  @Get('/logout')
  async logout(
    @Headers() headers: HeadersBaseModel,
  ): Promise<LogoutResponseModel> {
    const userId = (await this.usersService.getUserIdBy(headers))!;
    await this.usersService.setDeviceId(userId, '');
    return null;
  }
}
