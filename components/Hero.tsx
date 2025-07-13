"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-1.jpg"
          alt="Modern home decorations"
          fill
          priority
          quality={100}
          className="object-cover"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/40" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="container max-w-6xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 },
              },
            }}
            className="space-y-8"
          >
            <motion.h1
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
            >
              <span className="block">Simply Unique</span>
              <span className="block">Simply Better</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto"
            >
              MiniEcommerce is your go-to gift and decorations store based in
              Lagos, Nigeria
              <span className="block mt-2"> proudly serving since 2019.</span>
            </motion.p>

            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <Button
                size="lg"
                className="px-12 py-6 text-lg bg-white text-black hover:bg-white/90 hover:scale-105 transition-all"
              >
                Explore Collection
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 10, 20],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-white rounded-full mt-1"
          />
        </div>
      </motion.div>
    </section>
  );
}
