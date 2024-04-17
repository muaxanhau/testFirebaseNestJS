import { Body, Controller, Get, Post } from '@nestjs/common';
import { NoAuthGuard } from 'src/decorators';
import { StripeWebhookResponseBaseModel } from 'src/models';
import { StatusFoodsService } from 'src/services';
import {
  callbacksControllerUrl,
  callbacksStripeCancelUrl,
  callbacksStripeSuccessUrl,
  callbacksStripeWebhook,
} from './router';

@Controller(callbacksControllerUrl)
export class CallbacksController {
  constructor(private readonly statusFoodsService: StatusFoodsService) {}

  @NoAuthGuard()
  @Get(callbacksStripeSuccessUrl)
  async stripePaymentSuccess() {
    return 'success';
  }

  @NoAuthGuard()
  @Get(callbacksStripeCancelUrl)
  async stripePaymentCancel() {
    return 'cancel';
  }

  @NoAuthGuard()
  @Post(callbacksStripeWebhook)
  async postStripeWebhook(@Body() body: StripeWebhookResponseBaseModel) {
    const {
      type,
      data: {
        object: { id },
      },
    } = body;

    const isIncomplete = type !== 'checkout.session.completed';
    if (isIncomplete) {
      return null;
    }

    const statusFoods = await this.statusFoodsService.getBy({ paymentId: id });
    if (!statusFoods.length) return;

    await this.statusFoodsService.updateNextStatusFood(statusFoods[0].id);
  }
}
