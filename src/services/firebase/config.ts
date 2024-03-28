import * as admin from 'firebase-admin';
import { config } from 'src/config';

const { projectId, privateKey, clientEmail, databaseURL } = config;

admin.initializeApp({
  credential: admin.credential.cert({ projectId, privateKey, clientEmail }),
  databaseURL,
});

export const firestore = admin.firestore();
export const fireauth = admin.auth();
// const a = () => {
//   const message = {
//     notification: {
//       title,
//       body
//     },
//     data: {
//       alarm: ''
//     },
//     apns: {
//       payload: {
//         aps: {
//           alert: 'You got your emails.',
//           title,
//           body,
//           badge: 999
//         }
//       }
//     },
//     token: tokenDevice
//   }

//   admin.messaging().send({})
// }
