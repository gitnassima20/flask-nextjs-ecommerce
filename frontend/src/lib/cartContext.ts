import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) => set((state) => ({
        items: [...state.items, product]
      })),
      removeFromCart: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage
    }
  )
);

export default useCartStore;
