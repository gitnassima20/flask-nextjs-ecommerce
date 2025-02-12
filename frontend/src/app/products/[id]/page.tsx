"use client"

import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import useCartStore from '@/lib/cartContext';
import { Product } from '@/types/product';

// Mock product data (will be replaced with actual data fetching)
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
];

export default function ProductDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { addToCart } = useCartStore();
  
  // Find the product by ID
  const product = mockProducts.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
        <p className="mt-4 text-gray-600">The product you are looking for does not exist.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full aspect-square">
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill
            className="object-cover rounded-xl shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.category}</p>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
