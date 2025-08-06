import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const newArrivalsCollection = collection(db, "new-arrivals");
    const newArrivalsSnapshot = await getDocs(newArrivalsCollection);
    const newArrivals = newArrivalsSnapshot.docs.map((doc) => doc.data());

    return NextResponse.json(newArrivals, { status: 200 });
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return NextResponse.json(
      { error: "Failed to fetch new arrivals" },
      { status: 500 }
    );
  }
}
