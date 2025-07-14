"use client";

import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/stores/cart-store";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const [cartCount, setCartCount] = useState(0);

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  if (isLoading)
    return (
      <div className="container mx-auto p-6 text-center text-gray-700">
        Loading...
      </div>
    );
  if (error || !product)
    return (
      <div className="container mx-auto p-6 text-center text-red-600">
        Product not found
      </div>
    );

  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`Added to cart! (${cartCount + 1} items)`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl shadow-xl mb-8">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={400}
          className="w-full h-64 object-cover md:h-96 transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-lg">${product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Info and Actions */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-gray-700 mb-4 font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-950 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>

          <div className="text-gray-600 space-y-2">
            <p>
              <span className="font-medium">Availability:</span> In Stock
            </p>
            <p>
              <span className="font-medium">Category:</span>{" "}
              {product.name.includes("Room") ? "Furniture" : "Electronics"}
            </p>
          </div>
        </div>
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
}
