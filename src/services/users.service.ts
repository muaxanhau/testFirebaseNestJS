import { Injectable } from '@nestjs/common';
import { fireauth, usersCollection } from 'src/services/firebase';
import { UserModel } from 'src/models';

@Injectable()
export class UsersService {
  async addUser(id: string, data: UserModel) {
    const user = await usersCollection.addBy(id, data);
    return user;
  }

  async getUser(id: string) {
    const user = await usersCollection.get(id);
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

    const user = await usersCollection.get(id);
    return user;
  }

  async getAllUsers() {
    const users = await usersCollection.getAll();
    return users;
  }
}
