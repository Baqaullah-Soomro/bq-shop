import { createCheckoutSession } from '@/lib/stripe';
import { NextResponse } from 'next/server';

// Interface for cart items
interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	size: string;
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { items, billingDetails, shippingDetails } = body;

		const { session, error } = await createCheckoutSession({
			items: items.map((item: CartItem) => ({
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				image: item.image
			})),
			email: billingDetails.email,
			shipping: {
				cost: shippingDetails.shippingMethod === 'express' ? 1500 : 500,
				method: shippingDetails.shippingMethod
			},
			metadata: {
				billingName: `${billingDetails.firstName} ${billingDetails.lastName}`,
				shippingMethod: shippingDetails.shippingMethod
			}
		});

		if (error) {
			console.error('Checkout session error:', error);
			return NextResponse.json({ error }, { status: 500 });
		}

		if (!session?.url) {
			return NextResponse.json(
				{ error: 'Failed to create checkout URL' },
				{ status: 500 }
			);
		}

		return NextResponse.json({ url: session.url });
	} catch (error: any) {
		console.error('Stripe error:', error);
		return NextResponse.json(
			{ error: error.message || 'Error creating checkout session' },
			{ status: 500 }
		);
	}
}
