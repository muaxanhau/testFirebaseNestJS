import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryModel } from 'src/models';
import { CategoriesService, ItemsService } from 'src/services';

@Controller('/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly itemsService: ItemsService,
  ) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get('/items')
  async getAllCategoriesWithItems() {
    const categories = await this.categoriesService.getAllCategories();
    const items = await this.itemsService.getAllItems();

    const categoriesWithItems = categories.map((category) => ({
      ...category,
      items: items.filter((item) => item.categoryId.id === category.id),
    }));

    return categoriesWithItems;
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoriesService.getCategory(id);
  }

  @Post()
  addCategory(@Body() body: CategoryModel) {
    return this.categoriesService.addCategory(body);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() body: CategoryModel) {
    return this.categoriesService.updateCategory(id, body);
  }
}
