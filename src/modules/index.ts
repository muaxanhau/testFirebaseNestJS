import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { AdminRoleGuard } from 'src/guards';
import { UsersService } from 'src/services';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SubCategoriesModule } from './subCategories/subCategories.module';
import { FoodsModule } from './foods/foods.module';
import { TestsModule } from './tests/tests.module';
import { CallbacksModule } from './callbacks/callbacks.module';

@Module({
  imports: [
    TestsModule,
    CategoriesModule,
    SubCategoriesModule,
    FoodsModule,
    ItemsModule,
    UsersModule,
    CartsModule,
    RestaurantsModule,
    CallbacksModule,
  ],
  providers: [UsersService, AdminRoleGuard],
})
export class AppModule {}
