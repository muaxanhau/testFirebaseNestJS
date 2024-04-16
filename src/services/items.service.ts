import { Injectable } from '@nestjs/common';
import { itemsCollection } from 'src/services/firebase';
import { ItemModel } from 'src/models';
import { config } from 'src/config';

@Injectable()
export class ItemsService {
  async getAll() {
    const items = await itemsCollection.getAll();
    return items;
  }

  async get(id: string) {
    const item = await itemsCollection.get(id);
    return item;
  }

  async getByCategoryId(id: string, page = 0) {
    const allItems = await itemsCollection.getBy({ categoryId: id });
    const lengthFullItems = allItems.length;

    const totalPage = Math.ceil(lengthFullItems / config.limitPage);
    const nextPage = page + 1 > totalPage ? totalPage : page + 1;
    const prevPage = page;

    const items = await itemsCollection.getBy(
      { categoryId: id },
      { orderBy: 'name', page },
    );

    return {
      totalPage,
      nextPage,
      prevPage,
      items,
    };
  }

  async add(data: ItemModel) {
    const item = await itemsCollection.add(data);
    return item;
  }

  async delete(id: string) {
    await itemsCollection.delete(id);
  }

  async deleteBy(conditions: Partial<ItemModel>) {
    await itemsCollection.deleteBy(conditions);
  }
}
