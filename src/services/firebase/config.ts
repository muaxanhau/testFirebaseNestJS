import * as admin from 'firebase-admin';
import { config } from 'src/config';

const { projectId, privateKey, clientEmail, databaseURL } = config;

admin.initializeApp({
  credential: admin.credential.cert({ projectId, privateKey, clientEmail }),
  databaseURL,
});

export const firestore = admin.firestore();
export const fireauth = admin.auth();
