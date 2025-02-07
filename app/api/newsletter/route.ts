import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const { email } = await request.json();

		// Validate email
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return NextResponse.json(
				{ error: 'Please provide a valid email address' },
				{ status: 400 }
			);
		}

		// Simulate success response
		return NextResponse.json(
			{ message: 'Successfully subscribed to newsletter' },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to subscribe to newsletter' },
			{ status: 500 }
		);
	}
}
