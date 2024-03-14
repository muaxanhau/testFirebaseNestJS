import { Injectable } from '@nestjs/common';
import { cartsCollection } from './firebase';
import { CartIdModel, CartModel } from 'src/models/collections/cart.model';
import { firestore } from 'firebase-admin';

@Injectable()
export class CartsService {
  async addCart(userId: string, itemId: string) {
    const existed = !(
      await cartsCollection
        .where('userId', '==', userId)
        .where('itemId', '==', itemId)
        .get()
    ).empty;
    if (existed) {
      const carts = await cartsCollection
        .where('userId', '==', userId)
        .where('itemId', '==', itemId)
        .get();
      carts.forEach((doc) =>
        doc.ref.update({ quantity: firestore.FieldValue.increment(1) }),
      );

      return;
    }

    const data: CartModel = {
      userId,
      itemId,
      quantity: 1,
      createdAt: new Date(),
    };
    const response = await cartsCollection.add(data);
    const rawCart = await response.get();
    const cart: CartIdModel = {
      id: rawCart.id,
      ...(rawCart.data() as CartIdModel),
    };
    return cart;
  }
}
