import { Injectable } from '@nestjs/common';
import { config } from 'src/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe = new Stripe(config.stripe.privateKey);

  async getStripeUrl(
    baseUrl: string,
    items?: Stripe.Checkout.SessionCreateParams.LineItem[],
  ) {
    const success_url = `${baseUrl}return-urls/payment/stripe/success`;
    const cancel_url = `${baseUrl}return-urls/payment/stripe/cancel`;

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url,
      cancel_url,
      line_items: [
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
      ],
    });

    return session.url;
  }
}
