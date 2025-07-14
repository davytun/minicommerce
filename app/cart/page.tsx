"use client";

import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/stores/cart-store";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export default function Cart() {
  const { data: products = [] } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const cartItemsWithDetails = items.map((item) => {
    const product = products.find((p) => p.id.toString() === item.id);
    return {
      ...item,
      image: product?.image || item.image,
      price: product?.price || item.price,
    };
  });

  const subtotal = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10" && discount === 0) {
      setDiscount(subtotal * 0.1); // 10% discount
    }
  };

  const handleCheckout = () => {
    clearCart();
    router.push("/success?orderId=" + Math.floor(Math.random() * 1000000));
  };

  if (cartItemsWithDetails.length === 0) {
    return (
      <div className="container mx-auto p-4 md:py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p>
          Your cart is empty.{" "}
          <Link href="/shop" className="text-blue-500 underline">
            Continue shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:py-12 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4 text-gray-600">
            <span>1. Shopping cart</span>
            <span className="text-gray-400">2. Checkout details</span>
            <span className="text-gray-400">3. Order complete</span>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-center">Quantity</th>
                <th className="p-2 text-right">Price</th>
                <th className="p-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItemsWithDetails.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="p-2 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <p className="text-gray-700">Have a coupon?</p>
            <p className="text-sm text-gray-500 mb-2">
              Add your code for an instant cart discount
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon Code"
                className="p-2 border rounded w-full"
              />
              <button
                onClick={applyCoupon}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="text-green-600 mt-2">
                Discount applied: ${discount.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                defaultChecked
                className="text-[#4CAF50]"
              />
              Free shipping <span className="text-gray-500 ml-2">$0.00</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="shipping" className="text-[#4CAF50]" />
              Express shipping{" "}
              <span className="text-gray-500 ml-2">+$15.00</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="shipping" className="text-[#4CAF50]" />
              Pick Up <span className="text-gray-500 ml-2">+$12.00</span>
            </label>
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded mt-4 hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
