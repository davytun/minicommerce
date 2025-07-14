import { Providers } from "./providers";
import Header from "@/components/Header";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Mini-Commerce - Online Store for Furniture & Decor",
  description:
    "Discover a wide range of products at Mini-Commerce, your online store for furniture, decor, and more.",
  keywords: "furniture, decor, online store, shopping, Mini-Commerce",
  openGraph: {
    title: "Mini-Commerce",
    description: "Explore the best furniture and decor at Mini-Commerce.",
    url: "https://minicommerce-seven.vercel.app",
    siteName: "Mini-Commerce",
    images: [
      {
        url: "https://minicommerce-seven.vercel.app/hero-1.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini-Commerce",
    description: "Shop the latest furniture and decor at Mini-Commerce.",
    images: ["https://minicommerce-seven.vercel.app/hero-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Providers>
          <Header />
          <main className="pt-24 pb-8 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
