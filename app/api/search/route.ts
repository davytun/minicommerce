import { NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { Product } from "@/types/product";

export async function GET(request: Request) {
  try {
    const products: Product[] = productsData as Product[];

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase() || "";
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : 0;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : Infinity;

    // Filter products
    const results = products.filter((product) => {
      const matchesQuery =
        q &&
        (product.name.toLowerCase().includes(q) ||
          (product.description &&
            product.description.toLowerCase().includes(q)));
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchesQuery || (!q && matchesPrice);
    });

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
