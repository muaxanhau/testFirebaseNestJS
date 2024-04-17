import { Controller, Get, Post, Headers, Req } from '@nestjs/common';
import { NoRoleGuard } from 'src/decorators';
import { HeadersBaseModel } from 'src/models';
import {
  PaymentService,
  PushNotificationService,
  UsersService,
} from 'src/services';
import {
  GetStripePaymentResponse,
  PushNotificationResponse,
  UnauthorizeResponse,
} from './models';
import { exceptionUtils, utils } from 'src/utils';

@Controller('/tests')
export class TestsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly pushNotificationService: PushNotificationService,
    private readonly paymentService: PaymentService,
  ) {}

  @NoRoleGuard()
  @Post('/push-notification')
  async pushNotification(
    @Headers() headers: HeadersBaseModel,
  ): Promise<PushNotificationResponse> {
    const { deviceId } = (await this.usersService.getUserBy(headers))!;
    if (!deviceId?.length) return null;

    const message = 'Message from PN server';
    this.pushNotificationService.send({ deviceId, message });

    return null;
  }

  @NoRoleGuard()
  @Get('/unauthorize')
  async unauthorize(): Promise<UnauthorizeResponse> {
    return exceptionUtils.unauthorized();
  }

  @NoRoleGuard()
  @Get('/stripe-payment')
  async getStripePayment(
    @Req() request: Request,
  ): Promise<GetStripePaymentResponse> {
    const baseUrl = utils.getBaseUrl(request);

    const stripe = await this.paymentService.getStripe(baseUrl, [
      {
        quantity: 1,
        price_data: {
          currency: 'vnd',
          product_data: {
            name: 'Food test 1',
          },
          unit_amount: 20000,
        },
      },
    ]);
    if (!stripe || !stripe.url) return exceptionUtils.server();

    const { url } = stripe;
    return { url };
  }
}
