'use client';

import CheckoutPage from "@/components/CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with proper error handling
const getStripe = async () => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Missing Stripe publishable key');
  }
  
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  if (!stripe) {
    throw new Error('Failed to initialize Stripe');
  }
  
  return stripe;
};

export default function Checkout() {
  // Initialize Stripe
  getStripe().catch(error => {
    console.error('Stripe initialization error:', error);
  });

  return (
    <div className="container mx-auto py-8">
      <CheckoutPage />
    </div>
  );
}

