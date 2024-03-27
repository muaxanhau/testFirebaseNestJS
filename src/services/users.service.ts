import { Injectable } from '@nestjs/common';
import { fireauth, usersCollection } from 'src/services/firebase';
import { UserIdModel, UserModel } from 'src/models';

@Injectable()
export class UsersService {
  async addUser(id: string, data: UserModel) {
    const refUser = usersCollection.doc(id);
    const rawUser = await refUser.get();
    if (rawUser.exists) {
      const user: UserIdModel = {
        id,
        ...(rawUser.data() as UserModel),
      };
      return user;
    }

    await refUser.set(data);

    const user: UserIdModel = { id, ...data };
    return user;
  }

  async getUser(id: string) {
    const rawUser = await usersCollection.doc(id).get();
    if (!rawUser.exists) return undefined;

    const user: UserIdModel = {
      id: rawUser.id,
      ...(rawUser.data() as UserModel),
    };

    return user;
  }

  async getUserIdFromToken(token: string) {
    try {
      const { uid } = await fireauth.verifyIdToken(token);
      return uid;
    } catch (error) {
      return undefined;
    }
  }

  async getUserFromToken(token: string) {
    const id = await this.getUserIdFromToken(token);
    if (!id) return undefined;

    const user = await this.getUser(id);
    return user;
  }

  async getAllUsers() {
    const rawUsers = await usersCollection.get();
    const users: UserIdModel[] = rawUsers.docs.map((rawUser) => ({
      id: rawUser.id,
      ...(rawUser.data() as UserModel),
    }));

    return users;
  }
}
