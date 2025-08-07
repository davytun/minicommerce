import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  QueryConstraint,
} from "firebase/firestore";
import { Product } from "@/types/product";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const price = searchParams.get("price");

    const productsCollection = collection(db, "products");
    const queryConstraints: QueryConstraint[] = [];

    if (category && category !== "All") {
      queryConstraints.push(where("category", "==", category));
    }

    if (price) {
      if (price === "under50") {
        queryConstraints.push(where("price", "<", 50));
      } else if (price === "over150") {
        queryConstraints.push(where("price", ">", 150));
      }
    }

    if (sort) {
      if (sort === "priceLow") {
        queryConstraints.push(orderBy("price", "asc"));
      } else if (sort === "priceHigh") {
        queryConstraints.push(orderBy("price", "desc"));
      } else if (sort === "newest") {
        queryConstraints.push(orderBy("id", "desc"));
      }
    }

    const productsQuery = query(productsCollection, ...queryConstraints);
    const productsSnapshot = await getDocs(productsQuery);
    let products: Product[] = productsSnapshot.docs.map(
      (doc) => doc.data() as Product
    );

    if (price === "50to150") {
      products = products.filter(
        (product) => product.price >= 50 && product.price <= 150
      );
    }

    if (sort === "recommended") {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

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
