# Shop.co - Modern E-commerce Platform

A modern, responsive e-commerce platform built with Next.js 13, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Dynamic product listings with filtering and sorting
- 🔍 Real-time search functionality
- 🛒 Shopping cart with persistent storage
- 💳 Multi-step checkout process
- 📱 Fully responsive design
- ⭐ Customer reviews and ratings
- 🎨 Modern UI with Tailwind CSS
- 🔄 Server-side rendering with Next.js
- 🌐 API integration ready

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Headless UI (Accessible Components)
- React Hot Toast (Notifications)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shop-co.git
   ```

2. Install dependencies:
   ```bash
   cd shop-co
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
shop-co/
├── app/                    # Next.js 13 app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── shop/             # Shop pages
├── components/            # React components
│   ├── layout/           # Layout components
│   └── product/          # Product-related components
├── lib/                  # Utility functions and API client
├── store/                # Zustand store
└── public/               # Static assets
```

## Development

- Run tests: `npm test`
- Build for production: `npm run build`
- Start production server: `npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
