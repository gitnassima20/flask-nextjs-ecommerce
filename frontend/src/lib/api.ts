const BASE_URL = 'http://127.0.0.1:5000/api/v1';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    // Add a fallback image if image_url is missing
    return data.map((product: Product) => ({
      ...product,
      image_url: product.image_url || '/images/products/default.jpg'
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}