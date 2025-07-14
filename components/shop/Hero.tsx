"use client";

import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/hero-2.jpg"
          alt="Modern interior design"
          fill
          className="object-cover w-full"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-32 md:py-48">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Shop</span>
        </nav>

        {/* Hero Text */}
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-normal mb-4">Shop Page</h1>
          <p className="text-lg md:text-xl">
            Let&apos;s design the place you always imagined.
          </p>
        </div>
      </div>
    </section>
  );
};
