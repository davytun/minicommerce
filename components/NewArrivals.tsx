"use client";

import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/stores/cart-store";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  tag: string;
  image: string;
  colors: string[];
}

const fetchNewArrivals = async (): Promise<Product[]> => {
  const response = await fetch("/api/new-arrivals");
  if (!response.ok) throw new Error("Failed to fetch new arrivals");
  const data = await response.json();
  return Array.isArray(data)
    ? data.filter(
        (p): p is Product => p !== null && typeof p === "object" && "id" in p
      )
    : [];
};

export function NewArrivals() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["newArrivals"],
    queryFn: fetchNewArrivals,
  });

  const addItem = useCartStore((state) => state.addItem);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    if (products.length === 0) setCurrentIndex(0);
    else if (currentIndex >= products.length) setCurrentIndex(0);
  }, [products, currentIndex]);

  const nextSlide = () => {
    if (products.length <= 1) return;
    setDirection("right");
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (products.length <= 1) return;
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`Added ${product.name} to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const variants = {
    enter: (direction: string) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Error loading new arrivals. Please try again later.
      </div>
    );

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-medium text-gray-900 mb-2">
            New Arrivals
          </h2>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        {/* Mobile (single card) */}
        <div className="md:hidden relative h-[400px] overflow-hidden">
          <AnimatePresence custom={direction}>
            {products.length > 0 && (
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-full mx-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                      products[currentIndex]?.tag === "50% OFF"
                        ? "bg-red-50 text-red-600"
                        : products[currentIndex]?.tag === "BESTSELLER"
                        ? "bg-amber-50 text-amber-600"
                        : products[currentIndex]?.tag === "NEW"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {products[currentIndex]?.tag || "N/A"}
                  </span>

                  <div className="relative h-64 mb-6">
                    <Image
                      src={products[currentIndex].image}
                      alt={products[currentIndex].name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {products[currentIndex].name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-gray-900">
                        ${products[currentIndex].price.toFixed(2)}
                      </span>
                      {products[currentIndex].originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ${products[currentIndex].originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(products[currentIndex])}
                      className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            disabled={products.length <= 1}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            disabled={products.length <= 1}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Desktop (three cards) */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-8">
            {products.length > 0 ? (
              [
                products[
                  (currentIndex - 1 + products.length) % products.length
                ],
                products[currentIndex],
                products[(currentIndex + 1) % products.length],
              ]
                .filter(
                  (product): product is Product =>
                    product !== null && product !== undefined
                )
                .map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
                  >
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                        product?.tag === "50% OFF"
                          ? "bg-red-50 text-red-600"
                          : product?.tag === "BESTSELLER"
                          ? "bg-amber-50 text-amber-600"
                          : product?.tag === "NEW"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {product?.tag || "N/A"}
                    </span>

                    <div className="relative h-64 mb-6">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        priority={index === 1}
                      />
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-3 text-center py-10 text-gray-600">
                No products available.
              </div>
            )}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            disabled={products.length <= 1}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            disabled={products.length <= 1}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-3 md:mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? "right" : "left");
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-gray-900" : "bg-gray-300"
              }`}
              aria-label={`View product ${index + 1}`}
              disabled={products.length <= 1}
            />
          ))}
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}
