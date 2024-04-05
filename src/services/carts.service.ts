import { Injectable } from '@nestjs/common';
import { cartsCollection } from './firebase';
import { Timestamp } from 'firebase-admin/firestore';
import { CartModel } from 'src/models';

@Injectable()
export class CartsService {
  async getAllCarts() {
    const carts = await cartsCollection.getAll();
    return carts;
  }

  async getCartsByUserId(userId: string) {
    const carts = await cartsCollection.getBy({ userId });
    return carts;
  }

  async addCart(userId: string, itemId: string, quantity: number) {
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
