import { Injectable } from '@nestjs/common';
import { config } from 'src/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe = new Stripe(config.stripe.privateKey);

  async getStripe(
    baseUrl: string,
    items: Stripe.Checkout.SessionCreateParams.LineItem[],
  ) {
    if (!items.length) return undefined;

    const baseReturnUrl = `${baseUrl}callbacks/return-url/payments/stripe/`;
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${baseReturnUrl}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseReturnUrl}cancel`,
      line_items: items,
    });
    const { id, url } = session;
    return { id, url };
  }
}
