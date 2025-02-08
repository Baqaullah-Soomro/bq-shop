'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from "@clerk/nextjs";

export interface BillingFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

const BillingForm = ({ onSubmit }: { onSubmit: (data: BillingFormData) => void }) => {
	const { user } = useUser();
	const { register, handleSubmit, formState: { errors } } = useForm<BillingFormData>({
		defaultValues: {
			email: user?.emailAddresses[0]?.emailAddress || '',
		}
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">First Name</label>
					<input
						{...register('firstName', { required: 'First name is required' })}
						className="w-full border rounded-md p-2"
					/>
					{errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Last Name</label>
					<input
						{...register('lastName', { required: 'Last name is required' })}
						className="w-full border rounded-md p-2"
					/>
					{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Email</label>
				<input
					type="email"
					{...register('email', { required: 'Email is required' })}
					
					className="w-full border rounded-md p-2 bg-gray-50"
				/>
				{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
				<label className="block text-sm font-medium mb-1">Address</label>
				<input
					{...register('address', { required: 'Address is required' })}
					className="w-full border rounded-md p-2"
				/>
				{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
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

			<button
				type="submit"
				className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
			>
				Continue to Shipping
			</button>
		</form>
	);
};

export default BillingForm;