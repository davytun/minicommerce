"use client";

import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/stores/cart-store";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating?: number;
  category: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
};

export default function ProductCatalogue() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addItem = useCartStore((state) => state.addItem);
  const [cartNotification, setCartNotification] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ["All", "Furniture", "Lighting", "Decor", "Textiles"];
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under $50", value: "under50" },
    { label: "$50 - $150", value: "50to150" },
    { label: "Over $150", value: "over150" },
  ];
  const sortOptions = [
    { label: "Recommended", value: "recommended" },
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "priceLow" },
    { label: "Price: High to Low", value: "priceHigh" },
  ];

  const [filters, setFilters] = useState({
    category: "All",
    price: "all",
    sort: "recommended",
  });

  const filteredProducts = products
    .map((product) => ({
      ...product,
      originalPrice: product.price * 1.2,
      rating: Math.floor(Math.random() * 3) + 3,
    }))
    .filter((product) => {
      if (filters.category !== "All" && product.category !== filters.category)
        return false;
      if (filters.price === "under50" && product.price >= 50) return false;
      if (
        filters.price === "50to150" &&
        (product.price < 50 || product.price > 150)
      )
        return false;
      if (filters.price === "over150" && product.price <= 150) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "newest":
          return b.id - a.id;
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        default:
          return b.rating - a.rating;
      }
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setCartNotification(true);
    setTimeout(() => setCartNotification(false), 3000);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Error loading products. Please try again later.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filters.category === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>

          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
          const discount = product.originalPrice
            ? Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )
            : 0;

          return (
            <Link href={`/product/${product.slug}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer"
              >
                {discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                    -{discount}%
                  </div>
                )}

                <div className="aspect-square bg-gray-50 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < (product.rating || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through mr-2">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {/* Cart Notification */}
      <AnimatePresence>
        {cartNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Added to cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
