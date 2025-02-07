export const formatPrice = (price: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
};

export const convertToStripeAmount = (amount: number) => {
	return Math.round(amount * 100);
};

export const convertFromStripeAmount = (amount: number) => {
	return amount / 100;
};