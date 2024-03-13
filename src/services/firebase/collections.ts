import { firestore } from './config';

export const categoriesCollection = firestore.collection('categories');
export const itemsCollection = firestore.collection('items');
export const usersCollection = firestore.collection('users');
export const cartsCollection = firestore.collection('carts');
