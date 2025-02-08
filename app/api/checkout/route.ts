import { createCheckoutSession } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Interface for cart items with required fields
interface CartItem {
	id: string;          // Unique identifier
	name: string;        // Product name
	price: number;       // Product price
	quantity: number;    // Quantity selected
	image: string;       // Product image URL
	size: string;        // Selected size
}

export async function POST(req: Request) {
	try {
		// Add CORS headers
		const headersList = headers();
		const origin = headersList.get('origin') || '*';

		// Handle preflight request
		if (req.method === 'OPTIONS') {
			return new NextResponse(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': origin,
					'Access-Control-Allow-Methods': 'POST',
					'Access-Control-Allow-Headers': 'Content-Type',
					'Access-Control-Allow-Credentials': 'true',
				},
			});
		}

		// Parse request body
		let body;
		try {
			body = await req.json();
		} catch (error) {
			return new NextResponse(
				JSON.stringify({ error: 'Invalid JSON payload' }),
				{ 
					status: 400, 
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': origin,
						'Access-Control-Allow-Credentials': 'true',
					}
				}
			);
		}

		const { items, billingDetails, shippingDetails } = body;

		// Validate required fields
		if (!items?.length) {
			return new NextResponse(
				JSON.stringify({ error: 'No items in cart' }),
				{ 
					status: 400, 
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': origin,
						'Access-Control-Allow-Credentials': 'true',
					}
				}
			);
		}

		if (!billingDetails?.email) {
			return new NextResponse(
				JSON.stringify({ error: 'Billing email is required' }),
				{ 
					status: 400, 
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': origin,
						'Access-Control-Allow-Credentials': 'true',
					}
				}
			);
		}

		if (!shippingDetails?.shippingMethod) {
			return new NextResponse(
				JSON.stringify({ error: 'Shipping method is required' }),
				{ 
					status: 400, 
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': origin,
						'Access-Control-Allow-Credentials': 'true',
					}
				}
			);
		}

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
			return new NextResponse(
				JSON.stringify({ error }),
				{ 
					status: 500, 
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': origin,
						'Access-Control-Allow-Credentials': 'true',
					}
				}
			);
		}

		if (!session?.url) {
			console.error('No session URL returned');
			return new NextResponse(
				JSON.stringify({ error: 'Failed to create checkout URL' }),
				{ 
					status: 500, 
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': origin,
						'Access-Control-Allow-Credentials': 'true',
					}
				}
			);
		}

		return new NextResponse(
			JSON.stringify({ url: session.url }),
			{ 
				status: 200, 
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': origin,
					'Access-Control-Allow-Credentials': 'true',
				}
			}
		);
	} catch (error: any) {
		console.error('Stripe error:', error);
		return new NextResponse(
			JSON.stringify({ error: error.message || 'Error creating checkout session' }),
			{ 
				status: 500, 
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': 'true',
				}
			}
		);
	}
}
