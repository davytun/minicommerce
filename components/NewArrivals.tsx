"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const newArrivals = [
  {
    id: 1,
    name: "Lowseat Sofa",
    price: 199,
    originalPrice: 400,
    tag: "50% OFF",
    image: "/sofa.jpg",
    colors: ["#C4A484", "#8B5A2B", "#3A2D1B"],
  },
  {
    id: 2,
    name: "Table Lamp",
    price: 24.99,
    tag: "BESTSELLER",
    image: "/lamp.jpg",
    colors: ["#F5F5DC", "#D2B48C", "#808080"],
  },
  {
    id: 3,
    name: "Beige Table Lamp",
    price: 24.99,
    tag: "NEW",
    image: "/beige-lamp.jpg",
    colors: ["#F5F5DC", "#D3D3D3", "#A9A9A9"],
  },
  {
    id: 4,
    name: "Bamboo Basket",
    price: 24.99,
    tag: "ECO-FRIENDLY",
    image: "/bamboo-basket.jpg",
    colors: ["#D2B48C", "#8B4513", "#556B2F"],
  },
  {
    id: 5,
    name: "Toasted Side Table",
    price: 224.99,
    tag: "NEW",
    image: "/side-table.jpg",
    colors: ["#8B4513", "#A0522D", "#CD853F"],
  },
];

export function NewArrivals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const nextSlide = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev === newArrivals.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? newArrivals.length - 1 : prev - 1));
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
                    newArrivals[currentIndex].tag === "50% OFF"
                      ? "bg-red-50 text-red-600"
                      : newArrivals[currentIndex].tag === "BESTSELLER"
                      ? "bg-amber-50 text-amber-600"
                      : newArrivals[currentIndex].tag === "NEW"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {newArrivals[currentIndex].tag}
                </span>

                <div className="relative h-64 mb-6">
                  <Image
                    src={newArrivals[currentIndex].image}
                    alt={newArrivals[currentIndex].name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {newArrivals[currentIndex].name}
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">
                      ${newArrivals[currentIndex].price.toFixed(2)}
                    </span>
                    {newArrivals[currentIndex].originalPrice && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ${newArrivals[currentIndex].originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Desktop (three cards) */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-8">
            {[
              newArrivals[
                (currentIndex - 1 + newArrivals.length) % newArrivals.length
              ],
              newArrivals[currentIndex],
              newArrivals[(currentIndex + 1) % newArrivals.length],
            ].map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
              >
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                    product.tag === "50% OFF"
                      ? "bg-red-50 text-red-600"
                      : product.tag === "BESTSELLER"
                      ? "bg-amber-50 text-amber-600"
                      : product.tag === "NEW"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {product.tag}
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
                  <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-3 md:mt-8 ">
          {newArrivals.map((_, index) => (
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
