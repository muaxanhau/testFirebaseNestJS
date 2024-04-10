import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { config } from 'src/config';
import { NoRoleGuard } from 'src/decorators';
import { HeadersBaseModel } from 'src/models';
import { UsersService } from 'src/services';
import { firebaseMessaging } from 'src/services/firebase';
import { PushNotificationResponse } from './models';
import { exceptionUtils } from 'src/utils';

@Controller('/tests')
export class TestsController {
  constructor(private readonly usersService: UsersService) {}

  @NoRoleGuard()
  @Post('/push-notification')
  async pushNotification(
    @Headers() headers: HeadersBaseModel,
  ): Promise<PushNotificationResponse> {
    const token = headers[config.tokenName];

    const { deviceId } = (await this.usersService.getUserFromToken(token))!;
    if (!deviceId) return null;

    const title = 'App Test';
    const body = 'Message from PN server';

    await firebaseMessaging.send({
      token: deviceId!,
      notification: { title, body },
      apns: {
        payload: {
          aps: {
            title,
            body,
            // alert: 'You got your emails.',
            // badge: 999,
          },
        },
      },
      // android: {
      //   notification: {
      //       channelId: '--',
      //   },
      // },
      // data: {
      //   alarm: '',
      // },
    });

    return null;
  }

  @NoRoleGuard()
  @Get('/unauthorize')
  async unauthorize() {
    exceptionUtils.unauthorized();
  }
}
