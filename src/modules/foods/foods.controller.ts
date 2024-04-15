import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Put,
  Param,
} from '@nestjs/common';
import {
  CategoriesService,
  FoodsService,
  PushNotificationService,
  StatusFoodsService,
  SubCategoriesService,
  UsersService,
} from 'src/services';
import {
  AddFoodBodyModel,
  AddFoodResponseModel,
  AddFoodSessionBodyModel,
  AddFoodSessionResponseModel,
  GetAllFoodsByQueryQueryModel,
  GetAllFoodsByQueryResponseModel,
  GetFoodSessionsResponseModel,
  UpdateFoodSessionParamModel,
} from './models';
import { NoRoleGuard } from 'src/decorators';
import { dummyFoods, exceptionUtils } from 'src/utils';
import {
  HeadersBaseModel,
  RoleEnum,
  StatusFoodEnum,
  TriggerKeyPushNotificationEnum,
} from 'src/models';
import { config } from 'src/config';

@Controller('/foods')
export class FoodsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly foodsService: FoodsService,
    private readonly categoriesService: CategoriesService,
    private readonly subCategoriesService: SubCategoriesService,
    private readonly statusFoodsService: StatusFoodsService,
    private readonly pushNotificationService: PushNotificationService,
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

  @NoRoleGuard()
  @Post('/sessions')
  async addFoodSession(
    @Headers() headers: HeadersBaseModel,
    @Body() body: AddFoodSessionBodyModel,
  ): Promise<AddFoodSessionResponseModel> {
    const token = headers[config.tokenName];
    const userId = (await this.usersService.getUserIdFromToken(token))!;
    const { foodId } = body;

    const statusFood = await this.statusFoodsService.addStatusFood({
      userId,
      foodId,
      status: StatusFoodEnum.PENDING,
    });

    const admins = await this.usersService.getUserBy({
      role: RoleEnum.ADMIN,
    });

    const activeAdmins = admins.filter((user) => !!user.deviceId?.length);
    await Promise.all(
      activeAdmins.map((admin) =>
        this.pushNotificationService.send({
          deviceId: admin.deviceId!,
          title: 'Test Firebase app',
          message: 'New food session',
          key: TriggerKeyPushNotificationEnum.STATUS_FOOD,
        }),
      ),
    );

    return statusFood;
  }

  @NoRoleGuard()
  @Get('/sessions')
  async getFoodSessions(
    @Headers() headers: HeadersBaseModel,
  ): Promise<GetFoodSessionsResponseModel> {
    const token = headers[config.tokenName];
    const { id, role } = (await this.usersService.getUserFromToken(token))!;
    const foods = await this.foodsService.getAllFoods();

    const statusFoods = await (role === RoleEnum.USER
      ? this.statusFoodsService.getStatusFoodsBy({
          userId: id,
        })
      : this.statusFoodsService.getAllStatusFoods());

    const response: GetFoodSessionsResponseModel = statusFoods.map(
      (statusFood) => {
        const { id, foodId, status, userId } = statusFood;
        const { name } = foods.filter((food) => food.id === foodId)[0];
        return {
          id,
          status,
          food: {
            id: foodId,
            name,
          },
          user: {
            id: userId,
            role,
          },
        };
      },
    );

    return response;
  }

  @NoRoleGuard()
  @Put('/sessions/:id')
  async updateFoodSession(
    @Headers() headers: HeadersBaseModel,
    @Param() param: UpdateFoodSessionParamModel,
  ) {
    const token = headers[config.tokenName];
    const { id } = param;

    const statusFood = await this.statusFoodsService.getStatusFood(id);
    const user = (await this.usersService.getUserFromToken(token))!;

    if (user.role === RoleEnum.USER && user.id !== statusFood.userId) {
      exceptionUtils.role();
    }

    if (
      statusFood.status === StatusFoodEnum.PENDING &&
      user.role === RoleEnum.USER
    ) {
      exceptionUtils.role();
    }

    if (
      statusFood.status === StatusFoodEnum.PAYMENT &&
      user.role === RoleEnum.ADMIN
    ) {
      exceptionUtils.role();
    }

    if (
      statusFood.status === StatusFoodEnum.WAITING &&
      user.role === RoleEnum.USER
    ) {
      exceptionUtils.role();
    }

    if (
      statusFood.status === StatusFoodEnum.DONE &&
      (user.role === RoleEnum.USER || user.role === RoleEnum.ADMIN)
    ) {
      exceptionUtils.role();
    }

    await this.statusFoodsService.updateNextStatusFood(statusFood.id);

    const title = 'Test Firebase app';
    const message = 'New food session';
    const admins = await this.usersService.getUserBy({
      role: RoleEnum.ADMIN,
    });
    const activeAdmins = admins.filter((user) => !!user.deviceId?.length);
    await Promise.all(
      activeAdmins.map((admin) =>
        this.pushNotificationService.send({
          deviceId: admin.deviceId!,
          title,
          message,
          key: TriggerKeyPushNotificationEnum.STATUS_FOOD,
        }),
      ),
    );

    const { deviceId } = await this.usersService.getUser(statusFood.userId);
    if (!!deviceId?.length) {
      await this.pushNotificationService.send({
        deviceId,
        title,
        message,
        key: TriggerKeyPushNotificationEnum.STATUS_FOOD,
      });
    }

    return null;
  }
}
