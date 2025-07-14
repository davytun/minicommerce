"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Success() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-6">
          Your order <span className="font-medium">#{orderId}</span> has been
          placed successfully.
        </p>
        <p className="text-gray-500 mb-8">
          We’ll send you a confirmation email shortly. Happy shopping!
        </p>
        <Link
          href="/"
          className="inline-block bg-[#4CAF50] text-white px-6 py-3 rounded-lg hover:bg-[#45a049] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
