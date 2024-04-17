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
    const userId = (await this.usersService.getUserIdBy(headers))!;
    const { foodId } = body;

    const statusFood = await this.statusFoodsService.add({
      userId,
      foodId,
      status: StatusFoodEnum.PENDING,
      paymentId: '',
    });

    this.pushNotificationService.sendToAllLoggedInAdmins({
      message: 'New food added',
      key: TriggerKeyPushNotificationEnum.STATUS_FOOD,
    });

    return statusFood;
  }

  @NoRoleGuard()
  @Get('/sessions')
  async getFoodSessions(
    @Headers() headers: HeadersBaseModel,
  ): Promise<GetFoodSessionsResponseModel> {
    const { id, role } = (await this.usersService.getUserBy(headers))!;
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

    const statusFood = await this.statusFoodsService.get(statusFoodId);
    if (!statusFood) return exceptionUtils.notFound();

    const { foodId } = statusFood;
    const food = await this.foodsService.get(foodId);
    if (!food) return exceptionUtils.notFound();

    const { name } = food;
    const stripe = await this.paymentService.getStripe(baseUrl, [
      {
        quantity: 1,
        price_data: {
          currency: 'vnd',
          product_data: { name },
          unit_amount: 20000,
        },
      },
    ]);
    if (!stripe || !stripe.url) return exceptionUtils.server();

    const { id: paymentId, url } = stripe;
    await this.statusFoodsService.updatePaymentId(statusFoodId, paymentId);

    return { url };
  }

  @NoRoleGuard()
  @Put('/sessions/:id')
  async updateFoodSession(
    @Headers() headers: HeadersBaseModel,
    @Param() param: UpdateFoodSessionParamModel,
  ): Promise<UpdateFoodSessionResponseModel> {
    const { id } = param;

    const statusFood = await this.statusFoodsService.get(id);
    if (!statusFood) return exceptionUtils.notFound();

    const isDone = statusFood.status === StatusFoodEnum.DONE;
    const isPayment = statusFood.status === StatusFoodEnum.PAYMENT;
    if (isDone || isPayment) return exceptionUtils.role();

    const user = (await this.usersService.getUserBy(headers))!;
    if (user.role === RoleEnum.USER) {
      const invalidUser = user.id !== statusFood.userId;
      const isPending = statusFood.status === StatusFoodEnum.PENDING;
      const isWaiting = statusFood.status === StatusFoodEnum.WAITING;
      if (invalidUser || isPending || isWaiting) return exceptionUtils.role();
    }

    await this.statusFoodsService.updateNextStatusFood(id);

    return null;
  }
}
