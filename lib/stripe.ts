import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required STRIPE_SECRET_KEY');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export async function createPaymentIntent(amount: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function createCheckoutSession(params: {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  email: string;
  metadata?: Record<string, string>;
  shipping?: {
    cost: number;
    method: string;
  };
}) {
  try {
    const lineItems = params.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      customer_email: params.email,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
      line_items: lineItems,
      shipping_options: params.shipping ? [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: params.shipping.cost,
              currency: 'usd',
            },
            display_name: `${params.shipping.method.charAt(0).toUpperCase() + params.shipping.method.slice(1)} Shipping`,
          },
        },
      ] : undefined,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: params.metadata,
    });

    return { session };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return { error: error.message || 'Failed to create checkout session' };
  }
}

export async function retrieveCheckoutSession(sessionId: string) {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent'],
    });
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw error;
  }
}
