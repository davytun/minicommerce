import Features from "@/components/Features";
import { Hero } from "@/components/Hero";
import { NewArrivals } from "@/components/NewArrivals";
import { Footer } from "@/components/NewsletterFooter";
import { RoomCategories } from "@/components/RoomCategories";
import SaleBanner from "@/components/SaleBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <RoomCategories />
      <NewArrivals />
      <Features />
      <SaleBanner />
      <Footer />
    </main>
  );
}
