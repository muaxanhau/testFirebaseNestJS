import { Module } from '@nestjs/common';
import { CallbacksController } from './callbacks.controller';
import {
  PushNotificationService,
  StatusFoodsService,
  UsersService,
} from 'src/services';

@Module({
  controllers: [CallbacksController],
  providers: [StatusFoodsService, UsersService, PushNotificationService],
})
export class CallbacksModule {}
