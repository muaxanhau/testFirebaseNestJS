import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  CategoriesService,
  FoodsService,
  SubCategoriesService,
} from 'src/services';
import {
  AddFoodBodyModel,
  AddFoodResponseModel,
  GetAllFoodsByQueryQueryModel,
  GetAllFoodsByQueryResponseModel,
} from './models';
import { NoRoleGuard } from 'src/decorators';
import { dummyFoods } from 'src/utils';

@Controller('/foods')
export class FoodsController {
  constructor(
    private readonly foodsService: FoodsService,
    private readonly categoriesService: CategoriesService,
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  @Post('/dummies')
  async addDummiesFoods() {
    const categories = await this.categoriesService.getAllCategories({});
    const subCategories = await this.subCategoriesService.getAllSubCategories(
      {},
    );

    dummyFoods.map((food) => {
      const { name, description, category, subCategory } = food;
      const categoryId = categories.filter((cat) => cat.name === category)[0]
        .id;
      const subCategoryId = subCategories.filter(
        (subCat) => subCat.name === subCategory,
      )[0].id;

      this.foodsService.addFood({
        name,
        description,
        image: '',
        categoryId,
        subCategoryId,
      });
    });
    return null;
  }

  @Post()
  async addFood(@Body() body: AddFoodBodyModel): Promise<AddFoodResponseModel> {
    const data = await this.foodsService.addFood(body);
    return data;
  }

  @NoRoleGuard()
  @Get()
  async getAllFoodsByQuery(
    @Query() query: GetAllFoodsByQueryQueryModel,
  ): Promise<GetAllFoodsByQueryResponseModel> {
    const { restaurantId, categoryId, subCategoryId } = query;
    const data = await this.foodsService.getAllFoodsBy({
      restaurantId,
      categoryId,
      subCategoryId,
    });
    return data;
  }
}
