import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubCategoriesService } from 'src/services';
import { NoRoleGuard } from 'src/decorators';
import { dummySubCategories } from 'src/utils';
import {
  AddSubCategoryBodyModel,
  AddSubCategoryResponseModel,
  GetAllSubCategoriesQueryModel,
  GetAllSubCategoriesResponseModel,
} from './models';

@Controller('/sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post('/dummies')
  async addDummiesSubCategories() {
    await Promise.all(
      dummySubCategories.map((subCategory) =>
        this.subCategoriesService.addSubCategory(subCategory),
      ),
    );
    return null;
  }

  @Post()
  async addSubCategory(
    @Body() body: AddSubCategoryBodyModel,
  ): Promise<AddSubCategoryResponseModel> {
    const data = await this.subCategoriesService.addSubCategory(body);
    return data;
  }

  @NoRoleGuard()
  @Get()
  async getAllSubCategories(
    @Query() query: GetAllSubCategoriesQueryModel,
  ): Promise<GetAllSubCategoriesResponseModel> {
    const data = await this.subCategoriesService.getAllSubCategories(query);
    return data;
  }
}
