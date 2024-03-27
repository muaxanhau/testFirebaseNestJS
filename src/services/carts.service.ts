import { Injectable } from '@nestjs/common';
import { cartsCollection } from './firebase';
import { CartIdModel, CartModel } from 'src/models/collections/cart.model';
import { firestore } from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class CartsService {
  async getAllCarts() {
    const rawCarts = await cartsCollection.get();
    const carts: CartIdModel[] = rawCarts.docs.map((cart) => ({
      id: cart.id,
      ...(cart.data() as CartModel),
    }));

    return carts;
  }

  async getCartsByUserId(userId: string) {
    const rawCarts = await cartsCollection.where('userId', '==', userId).get();
    const carts: CartIdModel[] = rawCarts.docs.map((cart) => ({
      id: cart.id,
      ...(cart.data() as CartModel),
    }));

    return carts;
  }

  async addCart(userId: string, itemId: string, quantity: number) {
    // const existed = !(
    //   await cartsCollection
    //     .where('userId', '==', userId)
    //     .where('itemId', '==', itemId)
    //     .get()
    // ).empty;
    // if (existed) {
    //   const carts = await cartsCollection
    //     .where('userId', '==', userId)
    //     .where('itemId', '==', itemId)
    //     .get();
    //   carts.forEach((doc) =>
    //     doc.ref.update({ quantity: firestore.FieldValue.increment(1) }),
    //   );

    //   return;
    // }

    const data: CartModel = {
      userId,
      itemId,
      quantity,
      createdAt: Timestamp.fromDate(new Date()),
    };
    const response = await cartsCollection.add(data);
    const rawCart = await response.get();
    const cart: CartIdModel = {
      id: rawCart.id,
      ...(rawCart.data() as CartModel),
    };
    return cart;
  }
}
