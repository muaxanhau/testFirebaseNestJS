import { Injectable } from '@nestjs/common';
import { itemsCollection } from 'src/services/firebase';
import { ItemIdModel, ItemModel } from 'src/models';

@Injectable()
export class ItemsService {
  async getAllItems() {
    const rawItems = await itemsCollection.get();
    const items: ItemIdModel[] = rawItems.docs.map((item) => ({
      id: item.id,
      ...(item.data() as ItemModel),
    }));

    return items;
  }

  async getItem(id: string) {
    const rawItem = await itemsCollection.doc(id).get();
    if (!rawItem.exists) return undefined;

    const item: ItemIdModel = {
      id: rawItem.id,
      ...(rawItem.data() as ItemModel),
    };
    return item;
  }

  async getItemsByCategoryId(id: string) {
    const rawItem = await itemsCollection.where('categoryId', '==', id).get();
    const items: ItemIdModel[] = rawItem.docs.map((item) => ({
      id: item.id,
      ...(item.data() as ItemModel),
    }));
    return items;
  }

  async addItem(data: ItemModel) {
    const response = await itemsCollection.add(data);
    const rawItem = await response.get();
    const item: ItemIdModel = {
      id: rawItem.id,
      ...(rawItem.data() as ItemModel),
    };
    return item;
  }

  async deleteItem(id: string) {
    await itemsCollection.doc(id).delete();
  }

  async deleteAllItemsByCategoryId(id: string) {
    const rawItems = await itemsCollection.where('categoryId', '==', id).get();

    await Promise.all(rawItems.docs.map((doc) => doc.ref.delete()));
  }
}
