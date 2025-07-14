"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  image: string;
  colors?: string[];
  slug?: string;
  description: string;
}

const fetchSearchResults = async (
  query: string,
  minPrice?: number,
  maxPrice?: number
): Promise<Product[]> => {
  const url = new URL(
    "/api/search",
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  );
  if (query) url.searchParams.append("q", query);
  if (minPrice !== undefined)
    url.searchParams.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined)
    url.searchParams.append("maxPrice", maxPrice.toString());
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch search results");
  const data = await response.json();
  return data.map((item: Product) => ({
    ...item,
    slug: item.slug || item.name.toLowerCase().replace(/\s+/g, "-"),
  }));
};

export default function SearchPage() {
  const params = useParams();
  const query = params.q as string;

  const minPrice = 0;
  const maxPrice = Infinity;

  const {
    data: results = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchResults", query, minPrice, maxPrice],
    queryFn: () => fetchSearchResults(query, minPrice, maxPrice),
    enabled: !!query,
  });

  if (!query) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-500">
        No search query provided.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mx-auto"></div>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Search Results for &quot;{query}&quot;
      </h1>
      {results.length === 0 ? (
        <p className="text-gray-500 text-center">No results found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <li
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/product/${item.slug}`} className="block">
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    {item.name}
                  </h2>
                  <p className="text-gray-700">
                    ${item.price.toFixed(2)}
                    {item.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </p>
                  {item.tag && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.tag}
                    </span>
                  )}
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
