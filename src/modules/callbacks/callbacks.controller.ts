import { Body, Controller, Get, Post } from '@nestjs/common';
import { NoAuthGuard } from 'src/decorators';
import { StripeWebhookResponseBaseModel } from 'src/models';
import { StatusFoodsService } from 'src/services';

@Controller('/callbacks')
export class CallbacksController {
  constructor(private readonly statusFoodsService: StatusFoodsService) {}

  @NoAuthGuard()
  @Get('return-url/payments/stripe/success')
  async stripePaymentSuccess() {
    return 'success';
  }

  @NoAuthGuard()
  @Get('return-url/payments/stripe/cancel')
  async stripePaymentCancel() {
    return 'cancel';
  }

  @NoAuthGuard()
  @Post('webhooks/payments/stripe')
  async postStripeWebHook(@Body() body: StripeWebhookResponseBaseModel) {
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
