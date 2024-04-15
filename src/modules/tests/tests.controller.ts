import { Controller, Get, Post, Headers, Req } from '@nestjs/common';
import { config } from 'src/config';
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
    const token = headers[config.tokenName];

    const { deviceId } = (await this.usersService.getUserFromToken(token))!;
    if (!deviceId?.length) return null;

    const title = 'App Test';
    const message = 'Message from PN server';
    this.pushNotificationService.send({ deviceId, title, message });

    return null;
  }

  @NoRoleGuard()
  @Get('/unauthorize')
  async unauthorize(): Promise<UnauthorizeResponse> {
    exceptionUtils.unauthorized();
  }

  @NoRoleGuard()
  @Get('/stripe-payment')
  async getStripePayment(
    @Req() request: Request,
  ): Promise<GetStripePaymentResponse> {
    const baseUrl = utils.getBaseUrl(request);

    const url = (await this.paymentService.getStripeUrl(baseUrl)) || '';

    return { url };
  }
}
