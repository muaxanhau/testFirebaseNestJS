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
}
