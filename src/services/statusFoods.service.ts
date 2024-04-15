import { Injectable } from '@nestjs/common';
import { statusFoodsCollection } from './firebase';
import { StatusFoodEnum, StatusFoodModel } from 'src/models';

@Injectable()
export class StatusFoodsService {
  async addStatusFood(data: StatusFoodModel) {
    const statusFood = await statusFoodsCollection.add(data);
    return statusFood;
  }

  async getAllStatusFoods() {
    const statusFoods = await statusFoodsCollection.getAll();
    return statusFoods;
  }

  async getStatusFood(id: string) {
    const statusFoods = await statusFoodsCollection.get(id);
    return statusFoods;
  }

  async getStatusFoodsBy(conditions: Partial<StatusFoodModel>) {
    const statusFoods = await statusFoodsCollection.getBy(conditions);
    return statusFoods;
  }

  async updateNextStatusFood(id: string) {
    const { status } = await this.getStatusFood(id);
    const nextStatus =
      status === StatusFoodEnum.PENDING
        ? StatusFoodEnum.PAYMENT
        : status === StatusFoodEnum.PAYMENT
          ? StatusFoodEnum.WAITING
          : StatusFoodEnum.DONE;
    statusFoodsCollection.edit(id, { status: nextStatus });
  }
}
