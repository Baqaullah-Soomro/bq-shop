'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface TrackingStatus {
	status: string;
	tracking_number: string;
	eta?: string;
	tracking_history: Array<{
		status: string;
		status_details: string;
		status_date: string;
		location: string;
	}>;
}

export default function OrdersPage() {
	const searchParams = useSearchParams();
	const trackingNumber = searchParams.get('tracking');
	const [loading, setLoading] = useState(false);
	const [trackingInfo, setTrackingInfo] = useState<TrackingStatus | null>(null);

	useEffect(() => {
		if (trackingNumber) {
			fetchTrackingInfo();
		}
	}, [trackingNumber]);

	const fetchTrackingInfo = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/tracking?number=${trackingNumber}`);
			if (!response.ok) throw new Error('Failed to fetch tracking info');
			const data = await response.json();
			setTrackingInfo(data);
		} catch (error) {
			console.error('Error fetching tracking info:', error);
		} finally {
			setLoading(false);
		}
	};

	if (!trackingNumber) {
		return (
			<div className="container mx-auto p-8 max-w-2xl">
				<div className="bg-white rounded-lg shadow-lg p-8 text-center">
					<h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
					<p className="text-gray-600">
						Please use the tracking link from your order confirmation to view tracking details.
					</p>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="container mx-auto p-8 text-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
				<p className="mt-4">Loading tracking information...</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8 max-w-2xl">
			<div className="bg-white rounded-lg shadow-lg p-8">
				<h1 className="text-2xl font-bold mb-6">Order Tracking</h1>
				
				{trackingInfo ? (
					<div className="space-y-6">
						<div className="flex justify-between items-start border-b pb-4">
							<div>
								<p className="text-sm text-gray-600">Tracking Number</p>
								<p className="font-medium">{trackingInfo.tracking_number}</p>
							</div>
							<div className="text-right">
								<p className="text-sm text-gray-600">Status</p>
								<p className="font-medium">{trackingInfo.status}</p>
							</div>
						</div>

						{trackingInfo.eta && (
							<div className="bg-gray-50 p-4 rounded-lg">
								<p className="text-sm text-gray-600">Estimated Delivery</p>
								<p className="font-medium">{new Date(trackingInfo.eta).toLocaleDateString()}</p>
							</div>
						)}

						<div>
							<h2 className="font-semibold mb-4">Tracking History</h2>
							<div className="space-y-4">
								{trackingInfo.tracking_history.map((event, index) => (
									<div key={index} className="relative pl-6 pb-4">
										<div className="absolute left-0 top-2 w-2 h-2 bg-black rounded-full"></div>
										{index !== trackingInfo.tracking_history.length - 1 && (
											<div className="absolute left-1 top-3 w-0.5 h-full bg-gray-200"></div>
										)}
										<div className="ml-4">
											<p className="font-medium">{event.status}</p>
											<p className="text-sm text-gray-600">{event.status_details}</p>
											<div className="flex justify-between text-sm text-gray-500 mt-1">
												<span>{event.location}</span>
												<span>{new Date(event.status_date).toLocaleString()}</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				) : (
					<p className="text-center text-gray-600">
						No tracking information available for this number.
					</p>
				)}
			</div>
		</div>
	);
}
