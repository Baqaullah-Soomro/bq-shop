'use client';

import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import BillingForm, { BillingFormData } from "./BillingForm";
import ShippingForm, { ShippingFormData } from "./ShippingForm";

type CheckoutStep = 'billing' | 'shipping' | 'payment';

const CheckoutPage = () => {
	const [step, setStep] = useState<CheckoutStep>('billing');
	const [loading, setLoading] = useState(false);
	const [billingData, setBillingData] = useState<BillingFormData | null>(null);
	const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
	
	const { items, getTotal, clearCart } = useCart();
	const total = getTotal();
	const router = useRouter();

	const handleBillingSubmit = async (data: BillingFormData) => {
		setBillingData(data);
		setStep('shipping');
	};

	const handleShippingSubmit = async (data: ShippingFormData) => {
		try {
			setLoading(true);
			setShippingData(data);

			// Ensure all required data is present
			if (!billingData) {
				toast.error("Billing information is missing");
				setStep('billing');
				return;
			}

			// Prepare the request data
			const requestData = {
				items: items.map(item => ({
					id: item.id,
					name: item.name,
					price: item.price,
					image: item.image,
					quantity: item.quantity,
					size: item.size
				})),
				billingDetails: {
					...billingData,
					name: `${billingData.firstName} ${billingData.lastName}`
				},
				shippingDetails: data
			};

			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			const responseData = await response.json();
			
			if (!response.ok) {
				throw new Error(responseData.error || 'Failed to create checkout session');
			}
			
			if (responseData.url) {
				router.push(responseData.url);
			} else {
				throw new Error('Failed to create checkout session');
			}
		} catch (error: any) {
			console.error("Error:", error);
			toast.error(error.message || "Failed to proceed to checkout. Please try again.");
		} finally {
			setLoading(false);
		}
	};


	if (items.length === 0) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
				<p className="text-gray-600">Add some items to your cart to checkout.</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="mb-8">
				<div className="flex items-center justify-between mb-6">
					{['billing', 'shipping', 'payment'].map((s, index) => (
						<React.Fragment key={s}>
							<div className="flex items-center">
								<div className={`w-8 h-8 rounded-full flex items-center justify-center ${
									step === s ? 'bg-black text-white' : 
									step === 'shipping' && s === 'billing' ? 'bg-green-500 text-white' :
									'bg-gray-200'
								}`}>
									{index + 1}
								</div>
								<span className="ml-2 capitalize">{s}</span>
							</div>
							{index < 2 && (
								<div className="flex-1 h-0.5 mx-4 bg-gray-200" />
							)}
						</React.Fragment>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					{step === 'billing' && (
						<BillingForm onSubmit={handleBillingSubmit} />
					)}
					{step === 'shipping' && (
						<ShippingForm 
							onSubmit={handleShippingSubmit}
							onBack={() => setStep('billing')}
						/>
					)}
				</div>

				<div className="bg-gray-50 p-6 rounded-lg h-fit">
					<h2 className="text-xl font-bold mb-4">Order Summary</h2>
					<div className="space-y-4">
						{items.map((item) => (
							<div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
								<img
									src={item.image}
									alt={item.name}
									className="w-16 h-16 object-cover rounded"
								/>
								<div className="flex-1">
									<h3 className="font-medium">{item.name}</h3>
									<p className="text-sm text-gray-600">
										Size: {item.size} × {item.quantity}
									</p>
									<p className="font-medium">
										{formatPrice(item.price * item.quantity)}
									</p>
								</div>
							</div>
						))}
					</div>
					
					<div className="mt-6 pt-6 border-t space-y-2">
						<div className="flex justify-between">
							<span>Subtotal</span>
							<span>{formatPrice(total)}</span>
						</div>
						{shippingData && (
							<div className="flex justify-between">
								<span>Shipping ({shippingData.shippingMethod})</span>
								<span>{formatPrice(shippingData.shippingMethod === 'express' ? 15 : 5)}</span>
							</div>
						)}
						<div className="flex justify-between text-lg font-bold pt-2">
							<span>Total</span>
							<span>
								{formatPrice(total + (shippingData ? (shippingData.shippingMethod === 'express' ? 15 : 5) : 0))}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
