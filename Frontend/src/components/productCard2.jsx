"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"

const ProductCard2 = ({
  image = "/placeholder.svg",
  name = "APPLE A715-42G-R2NE I",
  price = 500,
  originalPrice = 1065,
  discount = 53,
  features = 'Key Features 39.6cm (15.6")',
  rating = 5,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    if (onAddToWishlist) {
      onAddToWishlist(!isWishlisted)
    }
  }

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart()
    }
  }

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />,
      )
    }
    return stars
  }

  return (
    <div
      className="w-72 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100 rounded-t-xl">
        {/* Discount Tag */}
        {discount > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10">
            {discount}% OFF
          </div>
        )}

        {/* Image with Fixed Size */}
        <div className="h-56 flex items-center justify-center p-4 overflow-hidden">
          <img
            src={imageError ? "/placeholder.svg" : image}
            alt={name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 transform-gpu hover:scale-110"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Wishlist Button (Heart Icon) */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>

        {/* Add to Cart Button - Appears on Hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 py-3 px-4 transform transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800 line-clamp-2 h-14">{name}</h2>

        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-xl font-bold text-gray-900">₹{price.toLocaleString()}</p>
          {originalPrice && originalPrice > price && (
            <p className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</p>
          )}
          {discount > 0 && <p className="text-sm font-medium text-green-600">{discount}% off</p>}
        </div>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{features}</p>

        {/* Ratings */}
        <div className="flex items-center mt-3 gap-1">
          <div className="flex">{renderStars(rating)}</div>
          <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
        </div>

        {/* Fast Delivery Badge */}
        <div className="mt-3 inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">Fast Delivery</div>
      </div>
    </div>
  )
}

export default ProductCard2
