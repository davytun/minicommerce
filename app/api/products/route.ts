import { NextResponse } from "next/server";
import productsData from "@/data/products.json"; // Import JSON file
import { Product } from "@/types/product";

export async function GET() {
  try {
    const products: Product[] = productsData as Product[];

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
