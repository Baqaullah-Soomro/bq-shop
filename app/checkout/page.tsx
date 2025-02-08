'use client';

import dynamic from 'next/dynamic';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = dynamic(() => import('@/components/CheckoutPage'), {
  ssr: false,
});

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

const stripePromise = loadStripe(stripeKey).then(stripe => {
  if (!stripe) {
    throw new Error('Failed to initialize Stripe');
  }
  return stripe;
});

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto py-8">
        <CheckoutPage />
      </div>
    </Elements>
  );
}



