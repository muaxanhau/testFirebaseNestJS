import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriesModule, ItemsModule, UsersModule],
})
export class AppModule {}
