import { FirestoreIdBaseModel } from '../base.model';

export type RestaurantAndFoodsModel = {
  restaurantId: string;
  foodId: string;
};
export type RestaurantAndFoodsIdModel =
  FirestoreIdBaseModel<RestaurantAndFoodsModel>;
