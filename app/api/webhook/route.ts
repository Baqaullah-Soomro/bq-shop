import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createLabel } from '@/lib/shipengine';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Use the new App Router config style
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	try {
		const body = await req.text();
		const signature = headers().get('stripe-signature')!;

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
		} catch (err: any) {
			console.error('Webhook signature verification failed:', err);
			return NextResponse.json(
				{ error: 'Webhook signature verification failed' },
				{ status: 400 }
			);
		}

		switch (event.type) {
			case 'checkout.session.completed':
				const session = event.data.object as Stripe.Checkout.Session;
				
				try {
					// Parse metadata
					const billingDetails = JSON.parse(session.metadata?.billingDetails || '{}');
					const shippingDetails = JSON.parse(session.metadata?.shippingDetails || '{}');
					const items = JSON.parse(session.metadata?.items || '[]');
					const shipmentId = session.metadata?.shipmentId;

					// Create shipping label if not already created
					if (shipmentId && !session.metadata?.labelUrl) {
						const label = await createLabel(shipmentId);
						
						// Update session with tracking info
						await stripe.checkout.sessions.update(session.id, {
							metadata: {
								...session.metadata,
								trackingNumber: label.tracking_number,
								labelUrl: label.label_download_url
							}
						});
					}

					// Log order details
					console.log('Order completed:', {
						sessionId: session.id,
						customerId: session.customer,
						amount: session.amount_total,
						items,
						billing: billingDetails,
						shipping: shippingDetails,
						tracking: session.metadata?.trackingNumber,
						labelUrl: session.metadata?.labelUrl
					});
				} catch (error) {
					console.error('Error processing completed checkout:', error);
				}
				break;

			case 'payment_intent.payment_failed':
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				console.error('Payment failed:', paymentIntent.id);
				break;
		}

		return NextResponse.json({ received: true });
	} catch (error: any) {
		console.error('Webhook error:', error);
		return NextResponse.json(
			{ error: error.message || 'Webhook error' },
			{ status: 400 }
		);
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};

