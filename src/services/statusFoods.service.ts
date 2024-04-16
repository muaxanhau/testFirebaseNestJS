import { Injectable } from '@nestjs/common';
import { statusFoodsCollection } from './firebase';
import {
  RoleEnum,
  StatusFoodEnum,
  StatusFoodModel,
  TriggerKeyPushNotificationEnum,
} from 'src/models';
import { UsersService } from './users.service';
import { PushNotificationService } from './pushNotification.service';

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
    const { status, userId } = await this.get(id);
    const nextStatus =
      status === StatusFoodEnum.PENDING
        ? StatusFoodEnum.PAYMENT
        : status === StatusFoodEnum.PAYMENT
          ? StatusFoodEnum.WAITING
          : StatusFoodEnum.DONE;
    statusFoodsCollection.edit(id, { status: nextStatus });

    const title = 'Test Firebase app';
    const message = 'Status food updated';

    const admins = await this.usersService.getBy({
      role: RoleEnum.ADMIN,
    });
    const loggedInAdmins = admins.filter((user) => !!user.deviceId?.length);
    await Promise.all(
      loggedInAdmins.map((admin) =>
        this.pushNotificationService.send({
          deviceId: admin.deviceId!,
          title,
          message,
          key: TriggerKeyPushNotificationEnum.STATUS_FOOD,
        }),
      ),
    );

    const { deviceId } = await this.usersService.get(userId);
    if (!!deviceId?.length) {
      await this.pushNotificationService.send({
        deviceId,
        title,
        message,
        key: TriggerKeyPushNotificationEnum.STATUS_FOOD,
      });
    }
  }

  async updatePaymentId(statusFoodId: string, paymentId: string) {
    statusFoodsCollection.edit(statusFoodId, { paymentId });
  }
}
