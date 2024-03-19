import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { AdminRoleGuard } from 'src/guards';
import { UsersService } from 'src/services';

@Module({
  imports: [CategoriesModule, ItemsModule, UsersModule, CartsModule],
  providers: [UsersService, AdminRoleGuard],
})
export class AppModule {}
