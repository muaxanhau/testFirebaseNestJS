import { Injectable } from '@nestjs/common';
import { itemsCollection } from 'src/services/firebase';
import { ItemIdModel, ItemModel } from 'src/models';
import { config } from 'src/config';

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

  /**
   *
   *
   *
   * [0,1,2,3,4,5,6]
   * length: 7
   *
   *
   */
  async getItemsByCategoryId(id: string, page = 0) {
    const fullItems = await itemsCollection.where('categoryId', '==', id).get();
    const lengthFullItems = fullItems.size;

    const totalPage = Math.ceil(lengthFullItems / config.limitPage);
    const nextPage = page + 1 > totalPage ? totalPage : page + 1;
    const prevPage = page;

    if (page === 0) {
      const rawItems = await itemsCollection
        .where('categoryId', '==', id)
        .orderBy('name')
        .limit(config.limitPage)
        .get();

      const items: ItemIdModel[] = rawItems.docs.map((item) => ({
        id: item.id,
        ...(item.data() as ItemModel),
      }));
      return {
        totalPage,
        nextPage,
        prevPage,
        items,
      };
    }

    const rawItems = await itemsCollection
      .where('categoryId', '==', id)
      .orderBy('name')
      .limit(config.limitPage * page)
      .get();

    const lastItem = rawItems.docs[rawItems.docs.length - 1];

    const restItems = await itemsCollection
      .where('categoryId', '==', id)
      .orderBy('name')
      .startAfter(lastItem)
      .limit(config.limitPage)
      .get();

    const items: ItemIdModel[] = restItems.docs.map((item) => ({
      id: item.id,
      ...(item.data() as ItemModel),
    }));
    return {
      totalPage,
      nextPage,
      prevPage,
      items,
    };
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
