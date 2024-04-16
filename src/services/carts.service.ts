import { Injectable } from '@nestjs/common';
import { cartsCollection } from './firebase';
import { Timestamp } from 'firebase-admin/firestore';
import { CartModel } from 'src/models';

@Injectable()
export class CartsService {
  async getAll() {
    const carts = await cartsCollection.getAll();
    return carts;
  }

  async getBy(conditions: Partial<CartModel>) {
    const carts = await cartsCollection.getBy(conditions);
    return carts;
  }

  async add(userId: string, itemId: string, quantity: number) {
    const data: CartModel = {
      userId,
      itemId,
      quantity,
      createdAt: Timestamp.fromDate(new Date()),
    };
    const cart = await cartsCollection.add(data);
    return cart;
  }
}
