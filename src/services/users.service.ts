import { Injectable } from '@nestjs/common';
import { firebaseAuth, usersCollection } from 'src/services/firebase';
import { UserModel } from 'src/models';

@Injectable()
export class UsersService {
  async addBy(id: string, data: UserModel) {
    const user = await usersCollection.addBy(id, data);
    return user;
  }

  async get(id: string) {
    const user = await usersCollection.get(id);
    return user;
  }

  async getBy(conditions: Partial<UserModel>) {
    const user = await usersCollection.getBy(conditions);
    return user;
  }

  async getUserIdByToken(token: string) {
    try {
      const { uid } = await firebaseAuth.verifyIdToken(token);
      return uid;
    } catch (error) {
      return undefined;
    }
  }

  async getByToken(token: string) {
    const id = await this.getUserIdByToken(token);
    if (!id) return undefined;

    const user = await usersCollection.get(id);
    return user;
  }

  async getAll() {
    const users = await usersCollection.getAll();
    return users;
  }

  async setDeviceId(userId: string, deviceId: string) {
    await usersCollection.edit(userId, { deviceId });
  }
}
