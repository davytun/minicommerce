"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export const Footer = () => {
  const footerLinks = [
    {
      title: "Shop",
      links: ["All Products", "New Arrivals", "Best Sellers", "Sale"],
    },
    {
      title: "Help",
      links: ["Contact Us", "Shipping", "Returns", "FAQ"],
    },
    {
      title: "Company",
      links: ["About Us", "Sustainability", "Careers", "Press"],
    },
  ];

  const socialLinks = [
    { icon: FaInstagram, url: "#" },
    { icon: FaTwitter, url: "#" },
    { icon: FaFacebook, url: "#" },
  ];

  return (
    <footer className="bg-white text-gray-900 border-t pt-16 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mb-4 flex items-center gap-2"
          >
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Mini-Commerce
            </span>
          </motion.div>
          <p className="text-gray-600 max-w-md text-center">
            Gift & Decoration Store
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider text-gray-800">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-6 mb-6 md:mb-0">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
            <span>
              © {new Date().getFullYear()}Copyright © 2023 3legant. All rights
              reserved.
            </span>
            <div className="hidden md:block h-4 w-px bg-gray-300"></div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
