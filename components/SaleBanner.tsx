"use client";

import { Paintbrush, Sofa, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SaleBanner() {
  return (
    <section className="relative overflow-hidden bg-[#f8f1e7] py-16 px-4 border-t-2 border-b-2 border-amber-200">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-amber-100/40 mix-blend-multiply"></div>
        <div className="absolute bottom-5 right-20 w-32 h-32 rounded-full bg-rose-100/30 mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 rotate-45 bg-blue-100/20"></div>
      </div>

      <div className="relative container mx-auto text-center">
        <motion.div
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: 2, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="inline-block px-6 py-2 mb-6 bg-amber-500 text-white text-sm font-medium rounded-full shadow-md"
        >
          <Sparkles className="inline mr-2 h-4 w-4" />
          SALE UP TO 35% OFF
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-none">
          <span className="block">HUNDREDS of</span>
          <motion.span
            className="relative inline-block mt-2"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
            }}
          >
            <span className="relative z-10">New lower</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-amber-300/40 -z-0"></span>
          </motion.span>
          <span className="block">prices!</span>
        </h2>

        {/* Subtext with decorative elements */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <Paintbrush className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-amber-600/30 h-12 w-12" />
          <p className="text-xl md:text-2xl italic text-gray-800 leading-relaxed">
            It&apos;s
            <span className="font-semibold text-rose-600">
              more affordable
            </span>{" "}
            than ever to give{" "}
            <span className="underline decoration-wavy decoration-amber-400">
              every room
            </span>{" "}
            in your home a{" "}
            <span className="relative">
              stylish makeover
              <Sofa className="absolute -right-6 -bottom-4 text-amber-600 h-6 w-6" />
            </span>
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/shop"
            className={`
              inline-flex items-center
              px-10 py-4 rounded-full font-medium text-lg
              bg-amber-600 text-white
              hover:bg-amber-700 transition-all
              border-2 border-amber-700 border-b-4
              shadow-md hover:shadow-lg
              transform hover:-translate-y-0.5
              active:border-b-2
            `}
          >
            Shop the Sale
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
