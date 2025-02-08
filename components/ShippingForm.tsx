'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

export interface ShippingFormData {
	name: string;
	address: string;
	apartment?: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	phone: string;
	shippingMethod: 'standard' | 'express';
}

interface ShippingFormProps {
	onSubmit: (data: ShippingFormData) => void;
	onBack: () => void;
	loading?: boolean;
}

const ShippingForm = ({ 
	onSubmit,
	onBack,
	loading = false
}: ShippingFormProps) => {
	const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormData>();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label className="block text-sm font-medium mb-1">Full Name</label>
				<input
					{...register('name', { required: 'Full name is required' })}
					className="w-full border rounded-md p-2"
				/>
				{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Street Address</label>
				<input
					{...register('address', { required: 'Address is required' })}
					className="w-full border rounded-md p-2"
				/>
				{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Apartment, suite, etc. (optional)</label>
				<input
					{...register('apartment')}
					className="w-full border rounded-md p-2"
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">City</label>
					<input
						{...register('city', { required: 'City is required' })}
						className="w-full border rounded-md p-2"
					/>
					{errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">State</label>
					<input
						{...register('state', { required: 'State is required' })}
						className="w-full border rounded-md p-2"
					/>
					{errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">ZIP Code</label>
					<input
						{...register('zipCode', { required: 'ZIP code is required' })}
						className="w-full border rounded-md p-2"
					/>
					{errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Country</label>
					<select
						{...register('country', { required: 'Country is required' })}
						className="w-full border rounded-md p-2"
					>
						<option value="">Select Country</option>
						<option value="US">United States</option>
						<option value="CA">Canada</option>
						<option value="GB">United Kingdom</option>
					</select>
					{errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Phone</label>
				<input
					type="tel"
					{...register('phone', { required: 'Phone is required' })}
					className="w-full border rounded-md p-2"
				/>
				{errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Shipping Method</label>
				<div className="space-y-2">
					<label className="flex items-center p-3 border rounded-md">
						<input
							type="radio"
							value="standard"
							defaultChecked
							{...register('shippingMethod', { required: 'Please select a shipping method' })}
							className="mr-3"
						/>
						<div>
							<p className="font-medium">USPS Priority Mail</p>
							<p className="text-sm text-gray-500">2-3 business days - $5.00</p>
						</div>
					</label>
					<label className="flex items-center p-3 border rounded-md">
						<input
							type="radio"
							value="express"
							{...register('shippingMethod', { required: 'Please select a shipping method' })}
							className="mr-3"
						/>
						<div>
							<p className="font-medium">USPS Priority Mail Express</p>
							<p className="text-sm text-gray-500">1-2 business days - $15.00</p>
						</div>
					</label>
				</div>
				{errors.shippingMethod && <p className="text-red-500 text-sm">{errors.shippingMethod.message}</p>}
			</div>

			<div className="flex gap-4">
				<button
					type="button"
					onClick={onBack}
					className="w-full border border-black py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
				>
					Back to Billing
				</button>
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
				>
					{loading ? 'Processing...' : 'Continue to Payment'}
				</button>
			</div>
		</form>
	);
};

export default ShippingForm;