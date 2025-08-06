import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFile } from "fs/promises";

// Instructions for the user:
// 1. Go to your Firebase project settings and then to the "Service accounts" tab.
// 2. Click on "Generate new private key". This will download a JSON file.
// 3. Save this file as "serviceAccountKey.json" in the root of this project.
// 4. Make sure to add "serviceAccountKey.json" to your .gitignore file to avoid committing it.
// 5. Run this script from the root of your project using: node scripts/migrate.mjs

async function main() {
  try {
    const serviceAccount = JSON.parse(
      await readFile(new URL("../serviceAccountKey.json", import.meta.url))
    );

    initializeApp({
      credential: cert(serviceAccount),
    });

    const db = getFirestore();

    // Migrate products
    const productsData = JSON.parse(
      await readFile(new URL("../data/products.json", import.meta.url))
    );

    const productsCollection = db.collection("products");
    const categories = ["Furniture", "Lighting", "Decor", "Textiles"];
    for (const product of productsData) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      await productsCollection.doc(product.slug).set({ ...product, category });
    }
    console.log("Products migrated successfully!");

    // Migrate new arrivals
    const newArrivals = [
        {
          id: 1,
          name: "Lowseat Sofa",
          price: 199,
          originalPrice: 400,
          tag: "50% OFF",
          image: "/sofa.jpg",
          colors: ["#C4A484", "#8B5A2B", "#3A2D1B"],
        },
        {
          id: 2,
          name: "Table Lamp",
          price: 24.99,
          tag: "BESTSELLER",
          image: "/lamp.jpg",
          colors: ["#F5F5DC", "#D2B48C", "#808080"],
        },
        {
          id: 3,
          name: "Beige Table Lamp",
          price: 24.99,
          tag: "NEW",
          image: "/beige-lamp.jpg",
          colors: ["#F5F5DC", "#D3D3D3", "#A9A9A9"],
        },
        {
          id: 4,
          name: "Bamboo Basket",
          price: 24.99,
          tag: "ECO-FRIENDLY",
          image: "/bamboo-basket.jpg",
          colors: ["#D2B48C", "#8B4513", "#556B2F"],
        },
        {
          id: 5,
          name: "Toasted Side Table",
          price: 224.99,
          tag: "NEW",
          image: "/side-table.jpg",
          colors: ["#8B4513", "#A0522D", "#CD853F"],
        },
      ];


    const newArrivalsCollection = db.collection("new-arrivals");
    for (const arrival of newArrivals) {
      await newArrivalsCollection.add(arrival);
    }
    console.log("New arrivals migrated successfully!");

  } catch (error) {
    console.error("Error migrating data:", error);
  }
}

main();
