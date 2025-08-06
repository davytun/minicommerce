import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  QueryConstraint,
} from "firebase/firestore";
import { Product } from "@/types/product";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase() || "";
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : null;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : null;

    const productsCollection = collection(db, "products");
    const queryConstraints: QueryConstraint[] = [];

    if (minPrice !== null) {
      queryConstraints.push(where("price", ">=", minPrice));
    }
    if (maxPrice !== null) {
      queryConstraints.push(where("price", "<=", maxPrice));
    }

    const productsQuery = query(productsCollection, ...queryConstraints);
    const productsSnapshot = await getDocs(productsQuery);
    let products: Product[] = productsSnapshot.docs.map(
      (doc) => doc.data() as Product
    );

    if (q) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          (product.description && product.description.toLowerCase().includes(q))
      );
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
