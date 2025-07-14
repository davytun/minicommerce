"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, X, Menu } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Zustand cart store
  const { items: cartItems } = useCartStore();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      console.log("Navigating to /search/", trimmedQuery); // Debug log
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    } else {
      toast.error("Please enter a search term.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-background py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
                Mini-Commerce
              </span>
            </motion.div>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-4"
          >
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Submit search"
              >
                <Search size={20} />
              </button>
            </motion.div>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-foreground hover:bg-accent/10 rounded-full transition-colors"
              aria-label="Search"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 text-foreground hover:bg-accent/10 rounded-full transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            {/* Cart with badge */}
            <Link
              href="/cart"
              className="p-2 text-foreground hover:bg-accent/10 rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {isClient && cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gray-900 text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden my-2"
            >
              <form onSubmit={handleSearch} className="flex">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 border border-input rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="px-4 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors"
                  aria-label="Submit search"
                >
                  <Search size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center space-x-6 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.span
                  layoutId="activeLink"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-1 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-4 py-3 rounded-md text-base font-medium ${
                      pathname === link.path
                        ? "bg-accent/10 text-primary"
                        : "text-foreground hover:bg-accent/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-border mt-2 pt-2">
                  <Link
                    href="/account"
                    className="px-4 py-3 rounded-md text-base font-medium text-foreground hover:bg-accent/10 flex items-center gap-2"
                  >
                    <User size={18} /> My Account
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </header>
  );
}
