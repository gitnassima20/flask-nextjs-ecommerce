const BASE_URL = '/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
}

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export async function fetchProducts(): Promise<Product[]> {
  console.log('Fetching products...');
  
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: defaultHeaders,
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Products fetched successfully:', data);
    
    return data.map((product: Product) => ({
      ...product,
      image_url: product.image_url || '/images/products/default.png'
    }));
  } catch (error) {
    console.error('Error in fetchProducts:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  console.log('Creating product:', product);
  
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Create product error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(errorText || 'Failed to create product');
    }

    const data = await response.json();
    console.log('Product created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createProduct:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  console.log('Updating product:', { id, product });
  
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update product error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(errorText || 'Failed to update product');
    }

    const data = await response.json();
    console.log('Product updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in updateProduct:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export async function deleteProduct(id: number): Promise<void> {
  console.log('Deleting product:', id);
  
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: defaultHeaders,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete product error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(errorText || 'Failed to delete product');
    }
    
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error in deleteProduct:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: Product;
}

export async function getCart(): Promise<CartItem[]> {
  console.log('Fetching cart...');
  
  try {
    const response = await fetch('/api/cart', {
      method: 'GET',
      headers: defaultHeaders,
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch cart: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Cart fetched successfully:', data);
    return data.cart || []; // Extract cart array from response
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

export async function addToCart(productId: number, quantity: number = 1): Promise<CartItem> {
  console.log('Adding to cart:', { productId, quantity });
  
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ product_id: productId, quantity }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add to cart: ${errorText}`);
    }

    const data = await response.json();
    console.log('Added to cart successfully:', data);
    return data.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function updateCartItem(productId: number, quantity: number): Promise<CartItem> {
  console.log('Updating cart item:', { productId, quantity });
  
  try {
    const response = await fetch('/api/cart', {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify({ product_id: productId, quantity }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update cart: ${errorText}`);
    }

    const data = await response.json();
    console.log('Cart item updated successfully:', data);
    return data.cart;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
}

export async function removeFromCart(productId: number): Promise<void> {
  console.log('Removing from cart:', productId);
  
  try {
    const response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: defaultHeaders,
      body: JSON.stringify({ product_id: productId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to remove from cart: ${errorText}`);
    }
    
    console.log('Removed from cart successfully');
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

export async function clearCart(): Promise<void> {
  console.log('Clearing cart');
  
  try {
    const response = await fetch('/api/cart?action=clear', {
      method: 'DELETE',
      headers: defaultHeaders,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to clear cart: ${errorText}`);
    }
    
    console.log('Cart cleared successfully');
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}