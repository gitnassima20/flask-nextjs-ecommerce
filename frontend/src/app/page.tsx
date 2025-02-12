"use client"

import ProductCard from '@/components/products/ProductCard'
import useCartStore from '@/lib/cartContext'
import { Product } from '@/types/product'

// Enhanced mock product data with descriptions
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vintage Leather Jacket',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Leather+Jacket',
    description: 'A timeless vintage leather jacket crafted from premium quality leather. Perfect for adding a touch of classic style to any outfit.',
    category: 'Clothing'
  },
  {
    id: '2',
    name: 'Smart Wireless Earbuds',
    price: 79.50,
    imageUrl: 'https://via.placeholder.com/300x300?text=Wireless+Earbuds',
    description: 'Advanced noise-cancelling wireless earbuds with crystal clear sound and long-lasting battery. Designed for music lovers and professionals.',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    price: 249.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Office+Chair',
    description: 'Ergonomically designed office chair with lumbar support, adjustable height, and premium cushioning. Comfort meets productivity.',
    category: 'Furniture'
  }
]

export default function ProductsPage() {
  const { addToCart } = useCartStore()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Our Collection</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore a curated selection of high-quality products designed to enhance your lifestyle.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  )
}
