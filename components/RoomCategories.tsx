"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const roomCategories = [
  {
    name: "Living Room",
    image: "/living-room.jpg",
    link: "/shop/living-room",
    description: "Elevate your gathering spaces",
  },
  {
    name: "Bedroom",
    image: "/bedroom.jpg",
    link: "/shop/bedroom",
    description: "Create your perfect sanctuary",
  },
  {
    name: "Kitchen",
    image: "/kitchen.jpg",
    link: "/shop/kitchen",
    description: "Stylish and functional essentials",
  },
];

export function RoomCategories() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
        >
          Shop by Room
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {roomCategories.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-1">{room.name}</h3>
                  <p className="text-white/90 mb-4">{room.description}</p>
                  <Link
                    href={room.link}
                    className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
                  >
                    Shop Now
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
