import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const sessionId = searchParams.get('sessionId');

		if (!sessionId) {
			return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
		}

		// Retrieve the checkout session with expanded data
		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['line_items', 'payment_intent', 'shipping_details'],
		});

		if (!session) {
			return NextResponse.json({ error: 'Session not found' }, { status: 404 });
		}

		// Compile order details
		const orderDetails = {
			id: session.id,
			amount_total: session.amount_total,
			status: session.payment_status,
			billing_details: session.customer_details,
			shipping_details: session.shipping_details,
			items: session.line_items?.data || [],
			created_at: new Date(session.created * 1000).toISOString(),
		};

		return NextResponse.json(orderDetails);
	} catch (error: any) {
		console.error('API error:', error);
		return NextResponse.json(
			{ error: error.message || 'Error fetching order details' },
			{ status: 500 }
		);
	}
}

