import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { trackShipment } from '@/lib/shipengine';

export async function GET(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { searchParams } = new URL(req.url);
		const sessionId = searchParams.get('sessionId');

		if (!sessionId) {
			return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
		}

		try {
			// Retrieve the checkout session with expanded data
			const session = await stripe.checkout.sessions.retrieve(sessionId, {
				expand: ['line_items', 'payment_intent'],
			});

			if (!session) {
				return NextResponse.json({ error: 'Session not found' }, { status: 404 });
			}

			// Parse metadata
			const billingDetails = JSON.parse(session.metadata?.billingDetails || '{}');
			const shippingDetails = JSON.parse(session.metadata?.shippingDetails || '{}');
			const items = JSON.parse(session.metadata?.items || '[]');

			// Get tracking information if available
			let trackingInfo = null;
			if (session.metadata?.trackingNumber) {
				try {
					trackingInfo = await trackShipment(session.metadata.trackingNumber);
				} catch (error) {
					console.error('Error fetching tracking info:', error);
				}
			}

			// Compile order details
			const orderDetails = {
				id: session.id,
				amount_total: session.amount_total,
				status: session.payment_status,
				billing_details: billingDetails,
				shipping_details: shippingDetails,
				items: items,
				tracking_number: session.metadata?.trackingNumber,
				tracking_status: trackingInfo?.status_description,
				estimated_delivery: trackingInfo?.estimated_delivery_date,
				label_url: session.metadata?.labelUrl,
				created_at: new Date(session.created * 1000).toISOString(),
			};

			return NextResponse.json(orderDetails);
		} catch (error: any) {
			console.error('Stripe/Tracking error:', error);
			return NextResponse.json(
				{ error: error.message || 'Error fetching order details' },
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
