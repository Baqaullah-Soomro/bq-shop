import { stripe } from '@/lib/stripe';
import { CartItem } from '@/hooks/useCart';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { createShipment, createLabel } from '@/lib/shipengine';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let requestData;
    try {
      const text = await req.text();
      console.log('Raw request data:', text); // Debug log
      requestData = JSON.parse(text);
      console.log('Parsed request data:', requestData); // Debug log
    } catch (error) {
      console.error('Error parsing request data:', error);
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }

    const { items, billingDetails, shippingDetails } = requestData;

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Validate each item
    const validItems = items.every(item => 
      item && 
      typeof item.id === 'string' && 
      typeof item.name === 'string' && 
      typeof item.price === 'number' && 
      typeof item.image === 'string' && 
      typeof item.quantity === 'number' && 
      typeof item.size === 'string'
    );

    if (!validItems) {
      return NextResponse.json({ error: 'Invalid item data' }, { status: 400 });
    }

    // Validate billing details
    if (!billingDetails || 
      !billingDetails.email || 
      !billingDetails.firstName || 
      !billingDetails.lastName || 
      !billingDetails.address || 
      !billingDetails.city || 
      !billingDetails.state || 
      !billingDetails.zipCode || 
      !billingDetails.country) {
      return NextResponse.json({ error: 'Missing billing details' }, { status: 400 });
    }

    // Validate shipping details
    if (!shippingDetails || 
      !shippingDetails.name || 
      !shippingDetails.address || 
      !shippingDetails.city || 
      !shippingDetails.state || 
      !shippingDetails.zipCode || 
      !shippingDetails.country || 
      !shippingDetails.shippingMethod) {
      return NextResponse.json({ error: 'Missing shipping details' }, { status: 400 });
    }

    try {
      // Create mock shipment
      const shipment = await createShipment(
        {
          name: shippingDetails.name,
          street: shippingDetails.address,
          city: shippingDetails.city,
          state: shippingDetails.state,
          zipCode: shippingDetails.zipCode,
          country: shippingDetails.country,
        },
        {
          name: "Shop Co Store",
          street: "123 Commerce St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "US"
        },
        items.map(() => ({ length: 10, width: 8, height: 4, weight: 2 }))
      );

      // Create mock shipping label
      const label = await createLabel(shipment.shipment_id);

      // Calculate shipping cost based on method
      const shippingCost = shippingDetails.shippingMethod === 'express' ? 1500 : 500;

      // Create line items for Stripe
      const lineItems = items.map((item: CartItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      // Add shipping as a line item
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${shippingDetails.shippingMethod.toUpperCase()} Shipping`,
            images: ['/icons/outlineOffer.svg']
          },
          unit_amount: shippingCost,
        },
        quantity: 1,
      });

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        customer_email: billingDetails.email,
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        metadata: {
          userId,
          items: JSON.stringify(items.map((item: CartItem) => ({
            id: item.id,
            quantity: item.quantity,
            size: item.size
          }))),
          billingDetails: JSON.stringify(billingDetails),
          shippingDetails: JSON.stringify(shippingDetails),
          shipmentId: shipment.shipment_id,
          trackingNumber: label.tracking_number,
          labelUrl: label.label_download_url,
        },
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB'],
        },
        billing_address_collection: 'required',
      });

      return NextResponse.json({ url: session.url });
    } catch (error: any) {
      console.error('Shipping/Stripe error:', error);
      return NextResponse.json(
        { error: error.message || 'Error processing shipping or payment' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

