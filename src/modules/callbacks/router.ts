export const callbacksControllerUrl = `/callbacks`;
const callbacksStripeUrl = `/return-url/payments/stripe`;
export const callbacksStripeSuccessUrl = `${callbacksStripeUrl}/success`;
export const callbacksStripeCancelUrl = `${callbacksStripeUrl}/cancel`;
export const callbacksStripeWebhook = `/webhooks/payments/stripe`;
// stripe listen --forward-to http://localhost:3000/v1/api/callbacks/webhooks/payments/stripe
