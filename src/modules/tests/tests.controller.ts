import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { config } from 'src/config';
import { NoRoleGuard } from 'src/decorators';
import { HeadersBaseModel } from 'src/models';
import { UsersService } from 'src/services';
import { firebaseMessaging } from 'src/services/firebase';
import { PushNotificationResponse } from './models';

import * as admin from 'firebase-admin';
import firebaseCert from './../../services/firebase/testfirebase-fe46e-firebase-adminsdk-3p205-f8b4fd1839.json';

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

    await firebaseMessaging.send({
      notification: {
        title: 'App Test',
        body: 'Message from PN',
      },
      android: {
        notification: {
          channelId: 'TestFirebaseNotificationChanel',
        },
      },
      data: {
        alarm: '',
      },
      apns: {
        payload: {
          aps: {
            alert: 'You got your emails.',
            title: 'App Test',
            body: 'Message from PN',
            badge: 999,
          },
        },
      },
      token: deviceId!,
    });

    return null;
  }
}
