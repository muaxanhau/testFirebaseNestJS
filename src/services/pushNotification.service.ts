import { Injectable } from '@nestjs/common';
import { firebaseMessaging } from './firebase';

@Injectable()
export class PushNotificationService {
  async send({ deviceId, title, message }: SendProps) {
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
        alarm: '',
        data1: 'test1',
        data2: 'test2',
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
};
