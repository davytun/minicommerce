import { NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json(newArrivals);
}
