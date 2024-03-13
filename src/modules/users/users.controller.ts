import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UserIdModel } from 'src/models';
import { UsersService } from 'src/services';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(@Body() body: UserIdModel) {
    const { id, ...user } = body;
    return this.usersService.addUser(id, user);
  }

  @Get('/self')
  async getUser(@Headers('firebase-token') token: string) {
    const id = await this.usersService.getUserIdFromToken(token);
    return this.usersService.getUser(id);
  }
}
