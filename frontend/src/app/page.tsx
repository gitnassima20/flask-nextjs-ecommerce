import ProductCard from '@/components/products/ProductCard'
import useCartStore from '@/lib/cartContext'
import { Product } from '@/types/product'

// Mock product data (will be replaced with API later)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vintage Leather Jacket',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Leather+Jacket',
    description: 'A stylish vintage leather jacket',
    category: 'Clothing'
  },
  {
    id: '2',
    name: 'Smart Wireless Earbuds',
    price: 79.50,
    imageUrl: 'https://via.placeholder.com/300x300?text=Wireless+Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    price: 249.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Office+Chair',
    description: 'Comfortable ergonomic chair for long work hours',
    category: 'Furniture'
  }
]

export default function ProductsPage() {
  const { addToCart } = useCartStore()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
