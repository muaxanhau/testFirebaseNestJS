import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import {
  PaymentService,
  PushNotificationService,
  UsersService,
} from 'src/services';

@Module({
  controllers: [TestsController],
  providers: [UsersService, PushNotificationService, PaymentService],
})
export class TestsModule {}
