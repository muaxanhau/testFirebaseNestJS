import {
  CartModel,
  CategoryModel,
  FoodModel,
  ItemModel,
  RestaurantAndFoodsModel,
  RestaurantModel,
  SubCategoryModel,
  UserModel,
} from 'src/models';
import { AddPrefixToKeys } from 'firebase-admin/firestore';
import { FirestoreIdBaseModel } from 'src/models';
import { firestore } from './config';
import { config } from 'src/config';

type QueryCollectionType = FirebaseFirestore.Query<
  FirebaseFirestore.DocumentData,
  FirebaseFirestore.DocumentData
>;
type CollectionType = FirebaseFirestore.CollectionReference<
  FirebaseFirestore.DocumentData,
  FirebaseFirestore.DocumentData
>;
type OrderBy<T> = {
  orderBy: keyof T;
  direction: FirebaseFirestore.OrderByDirection;
};
type Pagination = {
  limit: number;
  page: number;
};
type Overwrite = {
  overwrite: boolean;
};
type Options<T> = Partial<T> | void;

export class Collection<T extends Object & AddPrefixToKeys<string, any>> {
  private readonly collection: CollectionType;

  private async queryPagination(
    queryCollection: QueryCollectionType,
    options: Options<Pagination>,
  ) {
    if (!options) return queryCollection;

    const { page, limit = config.limitPage } = options;
    if (page === undefined || page < 0) return queryCollection;

    let query: QueryCollectionType = queryCollection;
    if (page === 0) {
      query = query.limit(limit);
      return query;
    }

    const rawItems = await query.limit(limit * page).get();
    const lastItem = rawItems.docs[rawItems.docs.length - 1];

    query = query.startAfter(lastItem).limit(limit);
    return query;
  }

  private queryOrderBy<T>(
    queryCollection: QueryCollectionType,
    options: Options<OrderBy<T>>,
  ) {
    if (!options) return queryCollection;

    const { orderBy, direction = 'asc' } = options;
    if (!orderBy) return queryCollection;

    let query: QueryCollectionType = queryCollection;
    query = query.orderBy(orderBy as string, direction);
    return query;
  }

  private queryConditions(
    queryCollection: QueryCollectionType,
    conditions: Partial<T>,
  ) {
    let query: QueryCollectionType = queryCollection;

    const conditionsArr = Object.entries(conditions).filter(
      ([, value]) => value !== undefined && value !== '',
    );

    conditionsArr.forEach(([field, value]) => {
      query = query.where(field, '==', value);
    });

    return query;
  }

  constructor(collectionName: string) {
    this.collection = firestore.collection(collectionName);
  }

  core() {
    return this.collection;
  }

  async exist(id: string) {
    const rawRecord = await this.collection.doc(id).get();
    return rawRecord.exists;
  }

  async get(id: string) {
    const rawRecord = await this.collection.doc(id).get();
    const record: FirestoreIdBaseModel<T> = {
      id: rawRecord.id,
      ...(rawRecord.data() as T),
    };
    return record;
  }

  async getAll(options: Options<Pagination & OrderBy<T>>) {
    let query: QueryCollectionType = this.collection;
    query = this.queryOrderBy(query, options);
    query = await this.queryPagination(this.collection, options);

    const rawRecords = await query.get();
    const records: FirestoreIdBaseModel<T>[] = rawRecords.docs.map(
      (record) => ({
        id: record.id,
        ...(record.data() as T),
      }),
    );
    return records;
  }

  async getBy(
    conditions: Partial<T>,
    options: Options<Pagination & OrderBy<T>>,
  ) {
    let query: QueryCollectionType = this.collection;
    query = this.queryConditions(query, conditions);
    query = this.queryOrderBy(query, options);
    query = await this.queryPagination(query, options);

    const rawRecords = await query.get();
    const records: FirestoreIdBaseModel<T>[] = rawRecords.docs.map(
      (record) => ({
        id: record.id,
        ...(record.data() as T),
      }),
    );
    return records;
  }

  async add(data: T) {
    const response = await this.collection.add(data);
    const rawRecord = await response.get();
    const record: FirestoreIdBaseModel<T> = {
      id: rawRecord.id,
      ...(rawRecord.data() as T),
    };
    return record;
  }

  async addBy(id: string, data: T, options: Options<Overwrite>) {
    const existed = await this.exist(id);
    if (!existed) {
      await this.collection.doc(id).set(data);
      const record: FirestoreIdBaseModel<T> = { id, ...data };
      return record;
    }

    if (options && options.overwrite) {
      const record = await this.edit(id, data);
      return record;
    }

    const record: FirestoreIdBaseModel<T> = { id, ...data };
    return record;
  }

  async edit(id: string, data: T) {
    await this.collection.doc(id).update(data);

    const record: FirestoreIdBaseModel<T> = { id, ...data };
    return record;
  }

  async delete(id: string) {
    await this.collection.doc(id).delete();
  }

  async deleteBy(conditions: Partial<T>) {
    let query: QueryCollectionType = this.collection;

    query = this.queryConditions(query, conditions);
    const raw = await query.get();

    await Promise.all(raw.docs.map((doc) => doc.ref.delete()));
  }
}

export const usersCollection = new Collection<UserModel>('users');
export const restaurantsCollection = new Collection<RestaurantModel>(
  'restaurants',
);
export const categoriesCollection = new Collection<CategoryModel>('categories');
export const subCategoriesCollection = new Collection<SubCategoryModel>(
  'subCategories',
);
export const foodsCollection = new Collection<FoodModel>('foods');
export const restaurantAndFoodsCollection =
  new Collection<RestaurantAndFoodsModel>('restaurant_foods');
export const itemsCollection = new Collection<ItemModel>('items');
export const cartsCollection = new Collection<CartModel>('carts');
