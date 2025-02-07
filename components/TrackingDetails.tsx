'use client';

import { useState, useEffect } from 'react';

interface TrackingInfo {
	tracking_status: {
		status: string;
		status_details: string;
		status_date: string;
		location: {
			city: string;
			state: string;
			country: string;
		};
	};
	tracking_history: Array<{
		status: string;
		status_details: string;
		status_date: string;
		location: {
			city: string;
			state: string;
			country: string;
		};
	}>;
}

interface TrackingDetailsProps {
	trackingNumber: string;
}

export default function TrackingDetails({ trackingNumber }: TrackingDetailsProps) {
	const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTrackingInfo = async () => {
			try {
				const response = await fetch(`/api/tracking?tracking_number=${trackingNumber}`);
				if (!response.ok) {
					throw new Error('Failed to fetch tracking information');
				}
				const data = await response.json();
				setTrackingInfo(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch tracking information');
			} finally {
				setLoading(false);
			}
		};

		if (trackingNumber) {
			fetchTrackingInfo();
		}
	}, [trackingNumber]);

	if (loading) {
		return <div className="animate-pulse">Loading tracking information...</div>;
	}

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	if (!trackingInfo) {
		return <div>No tracking information available</div>;
	}

	return (
		<div className="space-y-4">
			<div className="bg-gray-50 p-4 rounded-lg">
				<h3 className="font-semibold mb-2">Current Status</h3>
				<div className="text-sm">
					<p className="font-medium">{trackingInfo.tracking_status.status}</p>
					<p className="text-gray-600">{trackingInfo.tracking_status.status_details}</p>
					<p className="text-gray-500 mt-1">
						{new Date(trackingInfo.tracking_status.status_date).toLocaleString()}
					</p>
					<p className="text-gray-500">
						{trackingInfo.tracking_status.location.city}, {trackingInfo.tracking_status.location.state}
					</p>
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-2">Tracking History</h3>
				<div className="space-y-4">
					{trackingInfo.tracking_history.map((event, index) => (
						<div key={index} className="border-l-2 border-gray-200 pl-4 pb-4">
							<p className="font-medium">{event.status}</p>
							<p className="text-gray-600 text-sm">{event.status_details}</p>
							<p className="text-gray-500 text-sm mt-1">
								{new Date(event.status_date).toLocaleString()}
							</p>
							<p className="text-gray-500 text-sm">
								{event.location.city}, {event.location.state}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}