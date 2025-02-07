import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

export interface Product {
  id: any
  discountPrice: number
	style: string
	stock: number
	_id: string
	name: string
	price: number
	originalPrice?: number
	onSale: boolean
	description: string
	image: any
	images: string[]
	category: string
	sizes: string[]
	colors: string[]
	rating: number
	topSelling: boolean
	createdAt: string
	brand: string
	availability: 'In Stock' | 'Out of Stock'
	popularity: number
	reviews: {
		count: number
		averageRating: number
	}
	tags: string[]
	material: string
	care: string[]
	shipping: {
		free: boolean
		estimatedDays: number
	}
	discountPercent?: number
	new?: boolean
}

const productFields = groq`
	_id,
	name,
	price,
	originalPrice,
	onSale,
	description,
	image,
	images,
	category,
	sizes,
	colors,
	rating,
	topSelling,
	createdAt,
	brand,
	availability,
	popularity,
	reviews,
	tags,
	material,
	care,
	shipping,
	discountPercent,
	"new": new
`

export async function getProducts(): Promise<Product[]> {
	return await client.fetch(
		groq`*[_type == "products"]{${productFields}}`
	)
}

export async function getProduct(id: string): Promise<Product> {
	return await client.fetch(
		groq`*[_type == "products" && _id == $id][0]{${productFields}}`,
		{ id }
	)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
	return await client.fetch(
		groq`*[_type == "products" && category == $category]{${productFields}}`,
		{ category }
	)
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
	const results = await client.fetch(
		groq`{
			"sameCategory": *[_type == "products" && _id != $productId && category == $category] | order(_createdAt desc) [0...4] {
				${productFields}
			},
			"others": *[_type == "products" && _id != $productId && category != $category] | order(_createdAt desc) [0...4] {
				${productFields}
			}
		}`,
		{ 
			productId: product._id,
			category: product.category
		}
	);

	const sameCategoryProducts = results.sameCategory || [];
	const otherProducts = results.others || [];

	// If we have enough products from the same category, return those
	if (sameCategoryProducts.length >= 4) {
		return sameCategoryProducts;
	}

	// Otherwise, fill with products from other categories
	return [...sameCategoryProducts, ...otherProducts].slice(0, 4);
}




export async function searchProducts(query: string): Promise<Product[]> {
	if (!query) return [];
	
	const products = await client.fetch(
		groq`*[_type == "products"] {
			${productFields}
		}`
	);
	
	const searchTerm = query.toLowerCase();
	return products.filter((product: Product) => 
		product.name?.toLowerCase().includes(searchTerm) ||
		product.category?.toLowerCase().includes(searchTerm) ||
		product.brand?.toLowerCase().includes(searchTerm)
	).slice(0, 8);
}



export async function getTopSellingProducts(): Promise<Product[]> {
	return await client.fetch(
		groq`*[_type == "products" && topSelling == true] | order(popularity desc) [0...8] {
			${productFields}
		}`
	)
}

export async function getNewArrivals(): Promise<Product[]> {
	return await client.fetch(
		groq`*[_type == "products"] | order(createdAt desc) [0...8] {
			${productFields}
		}`
	)
}