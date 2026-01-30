import { create } from 'zustand';
import { CartItem, InventoryItem } from '@/types/inventory';

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: InventoryItem, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item: InventoryItem, quantity: number) =>
    set((state) => {
      const existingItem = state.items.find((ci) => ci.item.id === item.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ item, quantity });
      }
      state.calculateTotal();
      return { items: [...state.items] };
    }),
  removeItem: (itemId: string) =>
    set((state) => {
      const filtered = state.items.filter((ci) => ci.item.id !== itemId);
      state.items = filtered;
      state.calculateTotal();
      return { items: filtered };
    }),
  updateQuantity: (itemId: string, quantity: number) =>
    set((state) => {
      const item = state.items.find((ci) => ci.item.id === itemId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((ci) => ci.item.id !== itemId);
        }
      }
      state.calculateTotal();
      return { items: [...state.items] };
    }),
  clearCart: () =>
    set(() => ({
      items: [],
      total: 0,
    })),
  calculateTotal: () =>
    set((state) => ({
      total: state.items.reduce(
        (sum, ci) => sum + ci.item.price * ci.quantity,
        0
      ),
    })),
}));
