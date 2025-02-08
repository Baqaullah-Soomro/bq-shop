import { defineType } from "sanity"

export default defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Main Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'images',
            title: 'Additional Images',
            type: 'array',
            of: [{ type: 'image' }],
        },
        {
            name: "category",
            title: "Category",
            type: 'string',
            options: {
                list: [
                    {title: 'T-Shirt', value: 'tshirt'},
                    {title: 'Short', value: 'short'}, 
                    {title: 'Jeans', value: 'jeans'},
                    {title: 'Hoddie', value: 'hoodie'},
                    {title: 'Shirt', value: 'shirt'},
                ]
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "brand",
            title: "Brand",
            type: 'string',
            options: {
                list: [
                    {title: 'Nike', value: 'nike'},
                    {title: 'Adidas', value: 'adidas'},
                    {title: 'Puma', value: 'puma'},
                    {title: 'Reebok', value: 'reebok'},
                    {title: 'Under Armour', value: 'under-armour'},
                ]
            }
        },
        {
            name: "discountPercent",
            title: "Discount Percent",
            type: 'number',
        },
        {
            name: "new",
            type: 'boolean',
            title: "New",
        },
        {
            name: "colors",
            title: "Colors",
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: "sizes",
            title: "Sizes",
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(5),
        },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'object',
            fields: [
                {
                    name: 'count',
                    title: 'Count',
                    type: 'number',
                    initialValue: 0,
                },
                {
                    name: 'averageRating',
                    title: 'Average Rating',
                    type: 'number',
                    initialValue: 0,
                }
            ]
        },
        {
            name: 'material',
            title: 'Material',
            type: 'string',
        },
        {
            name: 'style',
            title: 'Style',
            type: 'string',
        },
        {
            name: 'stock',
            title: 'Stock',
            type: 'number',
            initialValue: 0,
        },
        {
            name: 'shipping',
            title: 'Shipping',
            type: 'object',
            fields: [
                {
                    name: 'free',
                    title: 'Free Shipping',
                    type: 'boolean',
                    initialValue: false,
                },
                {
                    name: 'estimatedDays',
                    title: 'Estimated Days',
                    type: 'number',
                    initialValue: 3,
                }
            ]
        },
        {
            name: 'availability',
            title: 'Availability',
            type: 'string',
            options: {
                list: [
                    { title: 'In Stock', value: 'In Stock' },
                    { title: 'Out of Stock', value: 'Out of Stock' },
                ]
            },
            initialValue: 'In Stock',
        },
        {
            name: 'popularity',
            title: 'Popularity Score',
            type: 'number',
            initialValue: 0,
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'care',
            title: 'Care Instructions',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
                calendarTodayLabel: 'Today'
            }
        }
    ],
})