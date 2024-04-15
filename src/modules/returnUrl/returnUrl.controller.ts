import { Controller, Get } from '@nestjs/common';
import { NoAuthGuard } from 'src/decorators';

@Controller('/return-urls')
export class ReturnUrlController {
  @NoAuthGuard()
  @Get('payment/stripe/success')
  async stripePaymentSuccess() {
    return 'success';
  }

  @NoAuthGuard()
  @Get('payment/stripe/cancel')
  async stripePaymentCancel() {
    return 'cancel';
  }
}
