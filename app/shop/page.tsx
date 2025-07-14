import { Hero } from "@/components/shop/Hero";
import ProductCatalogue from "@/components/shop/ProductCatalogue";

export const metadata = {
  title: "Shop - Mini-Commerce | Furniture & Decor Online",
  description:
    "Explore our wide range of furniture, decor, and more at Mini-Commerce. Shop the latest arrivals and best deals online.",
  keywords: "shop, furniture, decor, online shopping, Mini-Commerce",
  openGraph: {
    title: "Shop - Mini-Commerce",
    description:
      "Discover the best furniture and decor products at Mini-Commerce.",
    url: "https://minicommerce-seven.vercel.app/hero-2.jpg",
    siteName: "Mini-Commerce",
    images: [
      {
        url: "https://minicommerce-seven.vercel.app/hero-2.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop - Mini-Commerce",
    description:
      "Browse our latest furniture and decor collection at Mini-Commerce.",
    images: ["https://minicommerce-seven.vercel.app/hero-2.jpg"],
  },
  other: {
    links: [
      {
        rel: "canonical",
        href: "https://minicommerce-seven.vercel.app/hero-2.jpg",
      },
    ],
  },
};

export default function Shop() {
  return (
    <main>
      <Hero />
      <ProductCatalogue />
    </main>
  );
}
