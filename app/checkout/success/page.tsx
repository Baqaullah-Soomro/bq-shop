'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

interface OrderDetails {
  id: string;
  amount_total: number;
  status: string;
  billing_details: any;
  shipping_details: any;
  items: any[];
  tracking_number?: string;
  tracking_status?: string;
  estimated_delivery?: string;
  label_url?: string;
  created_at: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/session?sessionId=${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch order details');
      const data = await response.json();
      setOrderDetails(data);
      clearCart();
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSlip = () => {
    if (orderDetails?.label_url) {
      window.open(orderDetails.label_url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
        <p className="mt-4">Processing your order...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-2">
            Your order has been successfully placed and is being processed.
          </p>
          {orderDetails && (
            <p className="text-gray-600">
              Order Total: {formatPrice(orderDetails.amount_total / 100)}
            </p>
          )}
        </div>

        {orderDetails?.tracking_number && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Tracking Information</h2>
          <p className="text-gray-600">Tracking Number: {orderDetails.tracking_number}</p>
          {orderDetails.tracking_status && (
            <p className="text-gray-600">Status: {orderDetails.tracking_status}</p>
          )}
          {orderDetails.estimated_delivery && (
            <p className="text-gray-600">
            Estimated Delivery: {new Date(orderDetails.estimated_delivery).toLocaleDateString()}
            </p>
          )}
          </div>
        )}

        <div className="space-y-4">
          {orderDetails?.label_url && (
            <button
              onClick={handleDownloadSlip}
              className="w-full border border-black px-6 py-2 rounded hover:bg-gray-50 transition-colors"
            >
              Download Order Slip
            </button>
          )}
          <Link
            href="/shop"
            className="block w-full bg-black text-white text-center px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}


