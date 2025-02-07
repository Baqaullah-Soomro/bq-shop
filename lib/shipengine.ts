export interface ShippingAddress {
	name: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export async function createShipment(
	toAddress: ShippingAddress,
	fromAddress: ShippingAddress,
	packages: Array<{ length: number; width: number; height: number; weight: number }>
) {
	// Return mock shipment data
	return {
		shipment_id: 'mock_' + Date.now(),
		carrier_id: 'se-423887',
		service_code: 'usps_priority_mail',
		status: 'pending',
		ship_to: toAddress,
		ship_from: fromAddress,
		packages
	};
}

export async function createLabel(shipmentId: string) {
	// Return mock label data
	return {
		label_id: 'mock_label_' + Date.now(),
		shipment_id: shipmentId,
		tracking_number: 'MOCK' + Math.random().toString(36).substring(7).toUpperCase(),
		label_download_url: 'https://example.com/mock-label.pdf',
		status: 'completed'
	};
}

export async function trackShipment(trackingNumber: string) {
	// Return mock tracking data
	return {
		tracking_number: trackingNumber,
		status_description: 'In Transit',
		estimated_delivery_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
		events: [
			{
				occurred_at: new Date().toISOString(),
				description: 'Package in transit',
				city_locality: 'Test City',
				state_province: 'TX',
				country_code: 'US'
			}
		]
	};
}

export async function getRates(shippingMethod: 'standard' | 'express' = 'standard') {
	// Return mock shipping rates
	const rates = {
		standard: {
			rate_id: 'mock_rate_standard',
			service_code: 'usps_priority_mail',
			shipping_amount: { amount: 5.00, currency: 'usd' },
			delivery_days: 3
		},
		express: {
			rate_id: 'mock_rate_express',
			service_code: 'usps_priority_mail_express',
			shipping_amount: { amount: 15.00, currency: 'usd' },
			delivery_days: 1
		}
	};

	return { rates: [rates[shippingMethod]] };
}
