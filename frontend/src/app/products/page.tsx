import { Product } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';

async function getProducts(): Promise<Product[]> {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.VERCEL_URL;
  
  const response = await fetch(`${protocol}://${host}/api/products`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
