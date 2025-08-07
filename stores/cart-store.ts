import { create } from "zustand";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};


type CartStore = {
  items: CartItem[];
  userId: string | null;
  setUserId: (userId: string | null) => void;
  loadCart: (userId: string) => Promise<void>;
  addItem: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

import { StateCreator } from "zustand";

export const useCartStore = create<CartStore>(
  (set, get) =>
    ({
      items: [],
      userId: null,
      setUserId: (userId: string | null) => set({ userId }),
      loadCart: async (userId: string) => {
        const cartRef = doc(db, "carts", userId);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          set({ items: cartSnap.data().items });
        } else {
          set({ items: [] });
        }
      },
      addItem: async (item: Omit<CartItem, "quantity">) => {
        const { userId, items } = get();
        if (!userId) return;

        const existingItem = items.find((i) => i.id === item.id);
        let newItems;
        if (existingItem) {
          newItems = items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          newItems = [...items, { ...item, quantity: 1 }];
        }

        const cartRef = doc(db, "carts", userId);
        await setDoc(cartRef, { items: newItems });
        set({ items: newItems });
      },
      removeItem: async (id: string) => {
        const { userId, items } = get();
        if (!userId) return;

        const newItems = items.filter((item) => item.id !== id);
        const cartRef = doc(db, "carts", userId);
        await setDoc(cartRef, { items: newItems });
        set({ items: newItems });
      },
      updateQuantity: async (id: string, quantity: number) => {
        const { userId, items } = get();
        if (!userId) return;

        const newItems = items
          .map((item) => (item.id === id ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0);

        const cartRef = doc(db, "carts", userId);
        await setDoc(cartRef, { items: newItems });
        set({ items: newItems });
      },
      clearCart: async () => {
        const { userId } = get();
        if (!userId) return;

        const cartRef = doc(db, "carts", userId);
        await deleteDoc(cartRef);
        set({ items: [] });
      },
    } as CartStore)
);
