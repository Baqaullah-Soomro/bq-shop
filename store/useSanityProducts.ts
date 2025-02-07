import { create } from 'zustand';
import { Product, getProducts } from '@/lib/sanity.queries';

interface ProductStore {
	products: Product[];
	setProducts: (products: Product[]) => void;
	getNewArrivals: () => Product[];
	getTopSelling: () => Product[];
	loading: boolean;
	setLoading: (loading: boolean) => void;
	error: string | null;
	setError: (error: string | null) => void;
}

const useSanityProducts = create<ProductStore>((set, get) => ({
	products: [],
	loading: false,
	error: null,
	setProducts: (products) => set({ products }),
	setLoading: (loading) => set({ loading }),
	setError: (error) => set({ error }),
	getNewArrivals: () => {
		const { products } = get();
		return products.filter(product => product.new).slice(0, 8);
	},
	getTopSelling: () => {
		const { products } = get();
		// For now, return first 8 products as top selling
		return products.slice(0, 8);
	},
}));

export default useSanityProducts;