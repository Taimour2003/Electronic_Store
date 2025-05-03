"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Star, ShoppingCart, Heart, Eye, Loader2, AlertCircle } from "lucide-react"
import { useCart } from "@/store/ContextStore"
const ProductCard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const { addItem } = useCart()
  const navigate = useNavigate()

  // Fetch products function
  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5000/api/products/getAllProducts")
      setProducts(response.data)
      setError(null)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // Function to handle adding product to cart
  const addToCart = (e, product) => {
    e.stopPropagation()

    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      images: product.images,
    })

    // Implement your cart logic here
    console.log("Adding to cart:", product.name)
    // Show a toast notification
    alert(`Added ${product.name} to cart!`)
  }

  // Function to handle adding product to wishlist
  const addToWishlist = (e, product) => {
    e.stopPropagation()
    // Implement your wishlist logic here
    console.log("Adding to wishlist:", product.name)
  }

  // Function to navigate to product details
  const viewProductDetails = (product) => {
    navigate("/product-details", { state: { product } })
  }

  // Function to render star ratings
  const renderRating = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating || 4)
    const hasHalfStar = (rating || 4) - fullStars >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 half-filled" />)
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
      }
    }
    return stars
  }

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return null
    const discount = ((originalPrice - currentPrice) / originalPrice) * 100
    return Math.round(discount)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
        <AlertCircle className="h-12 w-12 mb-4" />
        <p className="text-lg">{error}</p>
        <button
          onClick={getProducts}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h1>
          <div className="w-24 h-1 bg-blue-600 rounded-full mb-6"></div>
          <p className="text-gray-600 text-center max-w-2xl">
            Discover our latest collection of premium electronics. From cutting-edge smartphones to high-performance
            laptops, we have everything you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => viewProductDetails(product)}
            >
              {/* Discount badge */}
              {calculateDiscount(product.originalPrice, product.price) && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                  {calculateDiscount(product.originalPrice, product.price)}% OFF
                </div>
              )}

              {/* Category badge */}
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md z-10">
                {product.category || "Electronics"}
              </div>

              {/* Product image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`http://localhost:5000${product.images?.[0] || "/placeholder.jpg"}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Quick action buttons - visible on hover */}
                <div
                  className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredProduct === product._id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={(e) => addToCart(e, product)}
                    className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    title="Add to cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => addToWishlist(e, product)}
                    className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    title="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      viewProductDetails(product)
                    }}
                    className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    title="Quick view"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product details */}
              <div className="p-5 flex-grow flex flex-col">
                {/* Brand name */}
                <span className="text-sm text-gray-500 mb-1">{product.brand || "Premium Brand"}</span>

                {/* Product name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">{renderRating(product.rating)}</div>
                  <span className="text-xs text-gray-500">
                    ({product.reviews?.length || Math.floor(Math.random() * 100) + 5} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Price */}
                <div className="mt-auto">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-blue-600">Rs. {product.price.toFixed(2)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        Rs. {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Stock status */}
                  <div className="mt-2">
                    {product.countInStock > 0 ? (
                      <span className="text-xs font-medium text-green-600">In Stock</span>
                    ) : (
                      <span className="text-xs font-medium text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={(e) => addToCart(e, product)}
                className="w-full py-3 bg-gray-100 hover:bg-blue-600 text-gray-800 hover:text-white font-medium transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
