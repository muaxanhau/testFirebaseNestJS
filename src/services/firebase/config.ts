import * as admin from 'firebase-admin';
import { config } from 'src/config';
import firebaseCert from './testfirebase-fe46e-firebase-adminsdk-3p205-f8b4fd1839.json';

const { projectId, privateKey, clientEmail, databaseURL } = config;

// admin.initializeApp({
//   credential: admin.credential.cert({ projectId, privateKey, clientEmail }),
//   databaseURL,
// });
admin.initializeApp({
  credential: admin.credential.cert(firebaseCert as admin.ServiceAccount),
  databaseURL,
});

export const firebaseStore = admin.firestore();
export const firebaseAuth = admin.auth();
export const firebaseMessaging = admin.messaging();
