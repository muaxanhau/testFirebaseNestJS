import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { AdminRoleGuard } from 'src/guards';
import { UsersService } from 'src/services';
import { RestaurantsModule } from './restaurants/restaurant.module';
import { SubCategoriesModule } from './subCategories/subCategories.module';
import { FoodsModule } from './foods/food.module';

@Module({
  imports: [
    CategoriesModule,
    SubCategoriesModule,
    FoodsModule,
    ItemsModule,
    UsersModule,
    CartsModule,
    RestaurantsModule,
  ],
  providers: [UsersService, AdminRoleGuard],
})
export class AppModule {}
