import { Injectable } from '@nestjs/common';
import { fireauth, usersCollection } from 'src/services/firebase';
import { UserIdModel, UserModel } from 'src/models';

@Injectable()
export class UsersService {
  async addUser(id: string, data: UserModel) {
    const refUser = usersCollection.doc(id);
    const rawUser = await refUser.get();
    if (rawUser.exists) return;

    await refUser.set(data);

    const user: UserIdModel = { id, ...data };
    return user;
  }

  async getUser(id: string) {
    const rawUser = await usersCollection.doc(id).get();
    const user: UserIdModel = {
      id: rawUser.id,
      ...(rawUser.data() as UserModel),
    };

    return user;
  }

  async getUserIdFromToken(token: string) {
    try {
      const decodedToken = await fireauth.verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      return undefined;
    }
  }
}
