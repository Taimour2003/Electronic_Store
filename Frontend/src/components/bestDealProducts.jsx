"use client"

import { useEffect, useState, useRef } from "react"
import ProductCard2 from "./productCard2"
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useImages } from "../store/ContextStore"
const BestDealProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const scrollContainerRef = useRef(null)
  const navigate = useNavigate()

  // Sample product data - in a real app, you'd fetch this from your API
  const sampleProducts = [
    {
      id: 1,
      name: "Apple MacBook Air M2",
      price: 999,
      originalPrice: 1199,
      discount: 17,
      features: "13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD",
      rating: 4.8,
      image: "/images/bgc.jpeg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      price: 1199,
      originalPrice: 1399,
      discount: 14,
      features: "6.8-inch Dynamic AMOLED, 12GB RAM, 256GB Storage",
      rating: 4.7,
      image: "/images/fab.jpeg",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Wireless Headphones",
      price: 349,
      originalPrice: 399,
      discount: 13,
      features: "Industry-leading noise cancellation, 30-hour battery life",
      rating: 4.9,
      image: "/images/image3.jpeg",
    },
    {
      id: 4,
      name: "iPad Pro 12.9-inch M2",
      price: 1099,
      originalPrice: 1299,
      discount: 15,
      features: "Liquid Retina XDR display, M2 chip, 128GB Storage",
      rating: 4.8,
      image: "/images/image3.jpeg",
    },
    {
      id: 5,
      name: "Dell XPS 15 Laptop",
      price: 1499,
      originalPrice: 1799,
      discount: 17,
      features: "15.6-inch 4K OLED, Intel i7, 16GB RAM, 512GB SSD",
      rating: 4.6,
      image: "/images/bgc.jpeg",
    },
    {
      id: 6,
      name: "Bose QuietComfort Earbuds II",
      price: 249,
      originalPrice: 299,
      discount: 17,
      features: "Wireless noise cancelling earbuds with personalized sound",
      rating: 4.7,
      image: "/images/fab.jpeg",
    },
  ]

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true)
    try {
      // In a real app, you'd uncomment this to fetch from your API
      // const response = await axios.get("http://localhost:5000/api/products/getBestDeals");
      // setProducts(response.data);

      // For demo purposes, we'll use the sample data with a delay to simulate API call
      setTimeout(() => {
        setProducts(sampleProducts)
        setLoading(false)
      }, 800)
    } catch (error) {
      console.error("Error fetching best deals:", error)
      setError("Failed to load best deals. Please try again later.")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle scroll buttons
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Handle add to cart
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product)
    // Implement your cart logic here
  }

  // Handle add to wishlist
  const handleAddToWishlist = (product, isAdding) => {
    console.log(isAdding ? "Added to wishlist:" : "Removed from wishlist:", product)
    // Implement your wishlist logic here
  }

  // Navigate to all deals page
  const viewAllDeals = () => {
    navigate("/deals")
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Today's Best Deals</h2>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Exclusive offers with incredible discounts on our most popular electronics. Limited time only!
            </p>
          </div>
          <button
            onClick={viewAllDeals}
            className="mt-4 md:mt-0 flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            View all deals <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
            {error}
            <button
              onClick={fetchProducts}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Products Container with Navigation Arrows */}
        {!loading && !error && products.length > 0 && (
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Scrollable Products Container */}
            <div
              ref={scrollContainerRef}
              className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product, index) => (
                <div key={product.id || index} className="snap-start flex-shrink-0">
                  <ProductCard2
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    features={product.features}
                    rating={product.rating}
                    onAddToCart={() => handleAddToCart(product)}
                    onAddToWishlist={(isAdding) => handleAddToWishlist(product, isAdding)}
                  />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No deals available at the moment. Please check back later!</p>
          </div>
        )}

        {/* Deal Timer */}
        <div className="mt-10 bg-gradient-to-r from-pink-600 to-pink-500 rounded-lg p-6 text-white text-center">
          <p className="text-lg font-medium mb-2">Limited Time Offer</p>
          <div className="flex justify-center gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">24</span>
              <p className="text-xs">Hours</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">36</span>
              <p className="text-xs">Minutes</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">52</span>
              <p className="text-xs">Seconds</p>
            </div>
          </div>
          <button className="mt-4 bg-white text-pink-600 px-6 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default BestDealProduct
