import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Put,
  Param,
  Req,
} from '@nestjs/common';
import {
  CategoriesService,
  FoodsService,
  PaymentService,
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
  GenerateStripePaymentUrlResponseModel,
  GetAllFoodsByQueryQueryModel,
  GetAllFoodsByQueryResponseModel,
  GetFoodSessionsResponseModel,
  UpdateFoodSessionParamModel,
  UpdateFoodSessionResponseModel,
} from './models';
import { NoRoleGuard } from 'src/decorators';
import { dummyFoods, exceptionUtils, utils } from 'src/utils';
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
    private readonly paymentService: PaymentService,
  ) {}

  @Post('/dummies')
  async addDummiesFoods() {
    const categories = await this.categoriesService.getAll({});
    const subCategories = await this.subCategoriesService.getAll({});

    dummyFoods.map((food) => {
      const { name, description, category, subCategory } = food;
      const categoryId = categories.filter((cat) => cat.name === category)[0]
        .id;
      const subCategoryId = subCategories.filter(
        (subCat) => subCat.name === subCategory,
      )[0].id;

      this.foodsService.add({
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
    const data = await this.foodsService.add(body);
    return data;
  }

  @NoRoleGuard()
  @Get()
  async getAllFoodsByQuery(
    @Query() query: GetAllFoodsByQueryQueryModel,
  ): Promise<GetAllFoodsByQueryResponseModel> {
    const { restaurantId, categoryId, subCategoryId } = query;
    const data = await this.foodsService.getBy({
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
    const userId = (await this.usersService.getUserIdByToken(token))!;
    const { foodId } = body;

    const statusFood = await this.statusFoodsService.add({
      userId,
      foodId,
      status: StatusFoodEnum.PENDING,
      paymentId: '',
    });

    const admins = await this.usersService.getBy({
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
    const { id, role } = (await this.usersService.getByToken(token))!;
    const foods = await this.foodsService.getAll();

    const statusFoods = await (role === RoleEnum.USER
      ? this.statusFoodsService.getBy({
          userId: id,
        })
      : this.statusFoodsService.getAll());

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
  @Get('/sessions/:id/payment/stripe')
  async generateStripePaymentUrl(
    @Req() request: Request,
    @Param() param: UpdateFoodSessionParamModel,
  ): Promise<GenerateStripePaymentUrlResponseModel> {
    const { id: statusFoodId } = param;
    const baseUrl = utils.getBaseUrl(request);

    const { foodId } = await this.statusFoodsService.get(statusFoodId);
    const { name } = await this.foodsService.get(foodId);

    const { id: paymentId, url } = await this.paymentService.getStripe(
      baseUrl,
      [
        {
          quantity: 1,
          price_data: {
            currency: 'vnd',
            product_data: { name },
            unit_amount: 20000,
          },
        },
      ],
    );
    if (!url?.length) {
      return { url: '' };
    }

    await this.statusFoodsService.updatePaymentId(statusFoodId, paymentId);

    return { url };
  }

  @NoRoleGuard()
  @Put('/sessions/:id')
  async updateFoodSession(
    @Headers() headers: HeadersBaseModel,
    @Param() param: UpdateFoodSessionParamModel,
  ): Promise<UpdateFoodSessionResponseModel> {
    const token = headers[config.tokenName];
    const { id } = param;

    const statusFood = await this.statusFoodsService.get(id);
    const user = (await this.usersService.getByToken(token))!;

    if (user.role === RoleEnum.USER && user.id !== statusFood.userId) {
      exceptionUtils.role();
    }

    if (
      statusFood.status === StatusFoodEnum.PENDING &&
      user.role === RoleEnum.USER
    ) {
      exceptionUtils.role();
    }

    if (statusFood.status === StatusFoodEnum.PAYMENT) {
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

    await this.statusFoodsService.updateNextStatusFood(id);

    return null;
  }
}
