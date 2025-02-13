'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clear: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cartItems = await getCart();
      setItems(Array.isArray(cartItems) ? cartItems : []);
    } catch (err) {
      setError('Failed to load cart');
      console.error('Error loading cart:', err);
      setItems([]); // Ensure items is always an array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addItem = async (productId: number, quantity: number = 1) => {
    try {
      setError(null);
      await addToCart(productId, quantity);
      await loadCart();
      toast.success('Added to cart');
      setIsCartOpen(true);
    } catch (err) {
      setError('Failed to add item to cart');
      toast.error('Failed to add item to cart');
      throw err;
    }
  };

  const updateItem = async (productId: number, quantity: number) => {
    try {
      setError(null);
      await updateCartItem(productId, quantity);
      await loadCart();
      toast.success('Cart updated');
    } catch (err) {
      setError('Failed to update cart item');
      toast.error('Failed to update cart');
      throw err;
    }
  };

  const removeItem = async (productId: number) => {
    try {
      setError(null);
      await removeFromCart(productId);
      await loadCart();
      toast.success('Item removed from cart');
    } catch (err) {
      setError('Failed to remove item from cart');
      toast.error('Failed to remove item');
      throw err;
    }
  };

  const clear = async () => {
    try {
      setError(null);
      await clearCart();
      setItems([]);
      toast.success('Cart cleared');
    } catch (err) {
      setError('Failed to clear cart');
      toast.error('Failed to clear cart');
      throw err;
    }
  };

  // Calculate totals only if items is an array
  const totalItems = Array.isArray(items) 
    ? items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const totalPrice = Array.isArray(items)
    ? items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        addItem,
        updateItem,
        removeItem,
        clear,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
