import { Hero } from "@/components/Hero";
import { NewArrivals } from "@/components/NewArrivals";
import { RoomCategories } from "@/components/RoomCategories";

export default function Home() {
  return (
    <main>
      <Hero />
      <RoomCategories />
      <NewArrivals />
    </main>
  );
}
