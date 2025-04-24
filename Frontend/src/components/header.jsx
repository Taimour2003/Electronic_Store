"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Headphones,
  Smartphone,
  Laptop,
  Watch,
  Camera,
  Tv,
  Zap,
  LogOut,
  UserCircle,
  ShieldCheck,
} from "lucide-react"

// Simple utility function for conditional class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3) // Example cart count
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle click outside for user menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/users/logOut", {
        method: "POST",
        credentials: "include",
      })
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // Categories with icons
  const categories = [
    { name: "Smartphones", icon: <Smartphone className="w-4 h-4 mr-2" /> },
    { name: "Laptops", icon: <Laptop className="w-4 h-4 mr-2" /> },
    { name: "Audio", icon: <Headphones className="w-4 h-4 mr-2" /> },
    { name: "Wearables", icon: <Watch className="w-4 h-4 mr-2" /> },
    { name: "Cameras", icon: <Camera className="w-4 h-4 mr-2" /> },
    { name: "TVs", icon: <Tv className="w-4 h-4 mr-2" /> },
    { name: "Accessories", icon: <Zap className="w-4 h-4 mr-2" /> },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-gradient-to-r from-blue-900 to-blue-700 text-white"
      }`}
    >
      {/* Top bar - Promotions/Info */}
      <div
        className={`hidden md:flex justify-center items-center py-2 text-xs font-medium ${
          isScrolled ? "bg-gray-100 text-gray-700" : "bg-blue-800 text-blue-100"
        }`}
      >
        <span>Free shipping on orders over $50 | 30-day money-back guarantee</span>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center transition-transform duration-200 group-hover:scale-105">
              <Zap className={`w-8 h-8 ${isScrolled ? "text-blue-600" : "text-yellow-300"}`} />
              <span className={`ml-2 text-xl font-bold ${isScrolled ? "text-gray-800" : "text-white"}`}>TechPulse</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center
                  ${
                    isScrolled
                      ? "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      : "text-blue-100 hover:bg-blue-800 hover:text-white"
                  }`}
              >
                {category.icon}
                {category.name}
              </Link>
            ))}
            <div className="group relative">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center
                ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    : "text-blue-100 hover:bg-blue-800 hover:text-white"
                }`}
              >
                More <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link to="/deals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Deals
                  </Link>
                  <Link to="/new-arrivals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    New Arrivals
                  </Link>
                  <Link to="/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Support
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Search, User, Wishlist, Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                  isScrolled ? "hover:bg-gray-200" : "hover:bg-blue-800"
                }`}
                aria-label="Search"
              >
                <Search className={`w-5 h-5 ${isScrolled ? "text-gray-700" : "text-white"}`} />
              </button>

              {/* Search dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl p-4 z-10 transition-opacity duration-200 opacity-100">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-4 py-2 focus:outline-none"
                    />
                    <button className="bg-blue-600 text-white p-2 transition-colors hover:bg-blue-700">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Popular: Smartphones, Laptops, Headphones</div>
                </div>
              )}
            </div>

            {/* User Account */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`hidden sm:flex p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                  isScrolled ? "hover:bg-gray-200" : "hover:bg-blue-800"
                }`}
                aria-label="User account"
              >
                <User className={`w-5 h-5 ${isScrolled ? "text-gray-700" : "text-white"}`} />
              </button>

              {/* User Dropdown Menu */}
              <div
                className={cn(
                  "absolute right-0 mt-2 w-56 bg-white text-gray-800 dark:bg-gray-800 dark:text-white shadow-lg rounded-lg py-2 z-10 transition-all duration-200 origin-top-right",
                  isMenuOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
                )}
              >
                <ul>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 flex items-center"
                    onClick={() => navigate("/signup")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Login / Signup</span>
                  </li>
                  <li
                    className="px-4 py-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 flex items-center"
                    onClick={() => navigate("/profile")}
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    <span>Open Profile</span>
                  </li>
                  <li
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </li>
                  <li className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    <span>Admin</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`hidden sm:flex p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                isScrolled ? "hover:bg-gray-200" : "hover:bg-blue-800"
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isScrolled ? "text-gray-700" : "text-white"}`} />
            </Link>

            {/* Cart */}
            <Link to="/AddToCart" className="relative group">
              <div
                className={`p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                  isScrolled ? "hover:bg-gray-200" : "hover:bg-blue-800"
                }`}
              >
                <ShoppingCart className={`w-5 h-5 ${isScrolled ? "text-gray-700" : "text-white"}`} />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-200 transform hover:scale-110">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div
        className={`px-4 py-3 ${
          isScrolled || isMobileMenuOpen ? "bg-white border-t border-gray-200" : "bg-blue-800 border-t border-blue-700"
        }`}
      >
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 text-sm focus:outline-none text-gray-800"
          />
          <button className="bg-blue-600 text-white p-2 transition-colors hover:bg-blue-700">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 flex items-center"
              >
                {category.icon}
                {category.name}
              </Link>
            ))}
            <Link
              to="/deals"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Deals
            </Link>
            <Link
              to="/new-arrivals"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              New Arrivals
            </Link>
            <Link
              to="/support"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Support
            </Link>
          </div>
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Guest User</div>
                <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
