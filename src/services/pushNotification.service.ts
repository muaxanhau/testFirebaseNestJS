import { Injectable } from '@nestjs/common';
import { firebaseMessaging } from './firebase';
import { TriggerKeyPushNotificationEnum } from 'src/models';

@Injectable()
export class PushNotificationService {
  async send({ deviceId, title, message, data, key }: SendProps) {
    await firebaseMessaging.send({
      token: deviceId,
      notification: { title, body: message },
      apns: {
        payload: {
          aps: {
            title,
            body: message,
            // alert: 'You got your emails.',
            // badge: 999,
          },
        },
      },
      data: {
        ...data,
        key: key?.toString() || '',
      },

      // android: {
      //   notification: {
      //       channelId: '--',
      //   },
      // },
    });
  }
}

type SendProps = {
  deviceId: string;
  title: string;
  message: string;
  key?: TriggerKeyPushNotificationEnum;
  data?: { [key: string]: string };
};
