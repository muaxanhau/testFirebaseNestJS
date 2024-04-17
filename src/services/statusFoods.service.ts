import { Injectable } from '@nestjs/common';
import { statusFoodsCollection } from './firebase';
import {
  StatusFoodEnum,
  StatusFoodModel,
  TriggerKeyPushNotificationEnum,
} from 'src/models';
import { UsersService } from './users.service';
import { PushNotificationService } from './pushNotification.service';
import { exceptionUtils } from 'src/utils';

@Injectable()
export class StatusFoodsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  async add(data: StatusFoodModel) {
    const statusFood = await statusFoodsCollection.add(data);
    return statusFood;
  }

  async getAll() {
    const statusFoods = await statusFoodsCollection.getAll();
    return statusFoods;
  }

  async get(id: string) {
    const statusFoods = await statusFoodsCollection.get(id);
    return statusFoods;
  }

  async getBy(conditions: Partial<StatusFoodModel>) {
    const statusFoods = await statusFoodsCollection.getBy(conditions);
    return statusFoods;
  }

  async updateNextStatusFood(id: string) {
    const statusFood = await this.get(id);
    if (!statusFood) return exceptionUtils.notFound();

    const { status, userId } = statusFood!;
    const nextStatus =
      status === StatusFoodEnum.PENDING
        ? StatusFoodEnum.PAYMENT
        : status === StatusFoodEnum.PAYMENT
          ? StatusFoodEnum.WAITING
          : StatusFoodEnum.DONE;
    statusFoodsCollection.edit(id, { status: nextStatus });

    const message = 'Status food updated';
    this.pushNotificationService.sendToAllLoggedInAdmins({
      message,
      key: TriggerKeyPushNotificationEnum.STATUS_FOOD,
    });

    const user = await this.usersService.get(userId);
    if (!user) return exceptionUtils.notFound();

    const validDeviceId = !!user.deviceId?.length;
    if (validDeviceId) {
      await this.pushNotificationService.send({
        deviceId: user.deviceId!,
        message,
        key: TriggerKeyPushNotificationEnum.STATUS_FOOD,
      });
    }
  }

  async updatePaymentId(statusFoodId: string, paymentId: string) {
    statusFoodsCollection.edit(statusFoodId, { paymentId });
  }
}
