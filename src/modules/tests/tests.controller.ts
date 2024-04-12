import { Controller, Get, Post, Headers } from '@nestjs/common';
import { config } from 'src/config';
import { NoRoleGuard } from 'src/decorators';
import { HeadersBaseModel } from 'src/models';
import { PushNotificationService, UsersService } from 'src/services';
import { PushNotificationResponse } from './models';
import { exceptionUtils } from 'src/utils';

@Controller('/tests')
export class TestsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @NoRoleGuard()
  @Post('/push-notification')
  async pushNotification(
    @Headers() headers: HeadersBaseModel,
  ): Promise<PushNotificationResponse> {
    const token = headers[config.tokenName];

    const { deviceId } = (await this.usersService.getUserFromToken(token))!;
    if (!deviceId?.length) return null;

    const title = 'App Test';
    const message = 'Message from PN server';
    this.pushNotificationService.send({ deviceId, title, message });

    return null;
  }

  @NoRoleGuard()
  @Get('/unauthorize')
  async unauthorize() {
    exceptionUtils.unauthorized();
  }
}
