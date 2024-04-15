import { FirestoreBaseModel } from '../base.model';

export type RestaurantAndFoodsModel = {
  restaurantId: string;
  foodId: string;
};
export type RestaurantAndFoodsIdModel =
  FirestoreBaseModel<RestaurantAndFoodsModel>;
