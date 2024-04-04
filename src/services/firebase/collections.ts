import { firestore } from './config';

export const restaurantsCollection = firestore.collection('restaurants');
export const categoriesCollection = firestore.collection('categories');
export const subCategoriesCollection = firestore.collection('subCategories');
export const foodsCollection = firestore.collection('foods');
export const restaurantAndFoodsCollection =
  firestore.collection('restaurant_foods');

export const itemsCollection = firestore.collection('items');
export const usersCollection = firestore.collection('users');
export const cartsCollection = firestore.collection('carts');
