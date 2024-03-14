import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [CategoriesModule, ItemsModule, UsersModule, CartsModule],
})
export class AppModule {}
