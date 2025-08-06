"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/stores/cart-store";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { loadCart, setUserId, clearCart } = useCartStore();

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
      loadCart(user.uid);
    } else {
      setUserId(null);
      clearCart();
    }
  }, [user, setUserId, loadCart, clearCart]);

  return <>{children}</>;
};
