import { prisma } from './prisma';
import { Stripe } from 'stripe';

export async function createOrder(
	session: Stripe.Checkout.Session,
	trackingNumber?: string
) {
	const { userId, items: itemsJson } = session.metadata || {};
	const items = JSON.parse(itemsJson || '[]');
	const shippingAddress = session.shipping_details?.address;
	const customerName = session.shipping_details?.name;

	if (!userId || !items.length || !shippingAddress || !customerName) {
		throw new Error('Missing required order information');
	}

	return await prisma.order.create({
		data: {
			userId,
			items,
			total: session.amount_total ? session.amount_total / 100 : 0,
			status: 'processing',
			trackingNumber,
			shippingAddress: {
				name: customerName,
				street: shippingAddress.line1 || '',
				city: shippingAddress.city || '',
				state: shippingAddress.state || '',
				zipCode: shippingAddress.postal_code || '',
				country: shippingAddress.country || '',
			},
		},
	});
}

export async function updateOrderStatus(orderId: string, status: string) {
	return await prisma.order.update({
		where: { id: orderId },
		data: { status },
	});
}

export async function updateOrderTracking(orderId: string, trackingNumber: string) {
	return await prisma.order.update({
		where: { id: orderId },
		data: { trackingNumber },
	});
}