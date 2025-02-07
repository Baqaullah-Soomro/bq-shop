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
		const trackingNumber = searchParams.get('number');

		if (!trackingNumber) {
			return NextResponse.json({ error: 'Tracking number is required' }, { status: 400 });
		}

		try {
			const trackingInfo = await trackShipment(trackingNumber);

			if (!trackingInfo) {
				return NextResponse.json({ error: 'Tracking information not found' }, { status: 404 });
			}

			// Transform ShipEngine tracking response to our format
			const transformedTracking = {
				status: trackingInfo.status_description,
				tracking_number: trackingNumber,
				eta: trackingInfo.estimated_delivery_date,
				tracking_history: trackingInfo.events.map((event: any) => ({
					status: event.status_description,
					status_details: event.description,
					status_date: event.occurred_at,
					location: `${event.city_locality || ''}, ${event.state_province || ''}, ${event.country_code || ''}`
				}))
			};

			return NextResponse.json(transformedTracking);
		} catch (error: any) {
			console.error('ShipEngine tracking error:', error);
			return NextResponse.json(
				{ error: error.message || 'Error fetching tracking information' },
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