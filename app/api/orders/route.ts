import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET() {
	try {
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		try {
			// Get orders from Stripe instead of database
			const sessions = await stripe.checkout.sessions.list({
				limit: 100,
				expand: ['data.line_items'],
			});

			// Filter sessions by userId from metadata
			const userOrders = sessions.data
				.filter(session => session.metadata?.userId === userId)
				.map(session => ({
					id: session.id,
					amount_total: session.amount_total,
					status: session.payment_status,
					items: session.line_items?.data,
					created_at: new Date(session.created * 1000).toISOString(),
					shipping_details: session.metadata?.shippingDetails ? JSON.parse(session.metadata.shippingDetails) : null,
					tracking_number: session.metadata?.trackingNumber,
					label_url: session.metadata?.labelUrl,
				}));

			return NextResponse.json({ orders: userOrders });
		} catch (error: any) {
			console.error('Stripe error:', error);
			return NextResponse.json(
				{ error: error.message || 'Error fetching orders from Stripe' },
				{ status: 400 }
			);
		}
	} catch (error: any) {
		console.error('API error:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 }
		);
	}
}
