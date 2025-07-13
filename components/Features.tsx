"use client";

import { Truck, BadgePercent, Shield, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Features() {
  const features = [
    {
      title: "Free Shipping",
      description: "On orders above $200",
      icon: Truck,
      color: "text-blue-500",
      delay: 0.1,
    },
    {
      title: "Hassle-Free Returns",
      description: "30 day money-back guarantee",
      icon: BadgePercent,
      color: "text-emerald-500",
      delay: 0.2,
    },
    {
      title: "Secure Checkout",
      description: "Protected by Stripe",
      icon: Shield,
      color: "text-purple-500",
      delay: 0.3,
    },
    {
      title: "We're Here",
      description: "24/7 customer support",
      icon: Headphones,
      color: "text-amber-500",
      delay: 0.4,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                transition={{ delay: feature.delay }}
                className="group"
              >
                <div
                  className={cn(
                    "h-full p-6 rounded-xl border border-border bg-card",
                    "transition-all duration-300 ease-in-out",
                    "group-hover:border-primary/30 group-hover:shadow-lg"
                  )}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "p-3 rounded-full mb-4",
                        "bg-secondary/50 group-hover:bg-secondary/80 transition-colors",
                        feature.color
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}