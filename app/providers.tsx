'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
console.log('Initializing Stripe with key:', stripeKey ? 'Key exists' : 'Key missing');

if (!stripeKey) {
	console.error('Missing Stripe publishable key');
	throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

const stripePromise = loadStripe(stripeKey);

interface ProvidersProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<Elements stripe={stripePromise}>
			{children}
		</Elements>
	);
}