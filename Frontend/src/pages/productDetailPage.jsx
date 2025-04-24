"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Expand, Heart, MapPin, Star, Truck } from 'lucide-react'
import { useLocation, useNavigate } from "react-router-dom"

import { useCart } from "@/store/ContextStore"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Create a default array of images if none are provided
  const productImages = images?.length
    ? images.map((img) => `http://localhost:5000${img}`)
    : ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"]

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-4">
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogTrigger asChild>
            <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full z-10 hover:bg-white transition-colors hover:scale-110 transform duration-200">
              <Expand className="h-5 w-5" />
              <span className="sr-only">Zoom image</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl bg-white/10 backdrop-blur-xl border-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="flex items-center justify-center h-full"
            >
              <img
                src={productImages[selectedImageIndex] || "/placeholder.svg"}
                alt={`${productName} - view ${selectedImageIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain"
              />
            </motion.div>
          </DialogContent>
        </Dialog>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img
              src={productImages[selectedImageIndex] || "/placeholder.svg"}
              alt={`${productName} - view ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain transition-all duration-300"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {productImages.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImageIndex(index)}
            className={`
              relative rounded-md overflow-hidden aspect-square border-2 transition-all
              ${selectedImageIndex === index 
                ? "border-black shadow-md" 
                : "border-transparent hover:border-gray-300"}
            `}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {selectedImageIndex === index && (
              <motion.div
                layoutId="selectedIndicator"
                className="absolute inset-0 bg-black/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

const ProductDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state?.product // Retrieve passed data
  const { addItem } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Calculate discounted price
  const discountedPrice = product ? product.price - product.price * (product.discount / 100) : 0

  // Format price with commas for Indian Rupee format
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    
    // Add item to cart
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      images: product.images,
    })
    
    // Reset button state after animation
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Button className="mt-4" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            className="mb-6 group flex items-center gap-2 hover:bg-black hover:text-white transition-all"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Product Image Gallery Section */}
                <div className="bg-white p-6 lg:p-10 flex items-center justify-center">
                  <div className="w-full">
                    <ProductImageGallery images={product.images} productName={product.name} />

                    {product.discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 20, 
                          delay: 0.3 
                        }}
                      >
                        <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5">
                          {product.discount}% OFF
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Product Details Section */}
                <div className="bg-white p-6 lg:p-10 flex flex-col">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-medium">
                          {product.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs font-medium">
                          {product.brand}
                        </Badge>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={toggleWishlist}
                              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <Heart 
                                className={`h-5 w-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                              />
                              <span className="sr-only">Add to wishlist</span>
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <motion.h1 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-2xl md:text-3xl font-bold mb-2 text-gray-900"
                    >
                      {product.name}
                    </motion.h1>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex items-center gap-2 mb-4"
                    >
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.div
                            key={star}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.4 + (star * 0.1),
                              type: "spring",
                              stiffness: 300
                            }}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">(120 reviews)</span>
                    </motion.div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-gray-600 mb-6"
                    >
                      {product.description}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mb-6"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{formatPrice(discountedPrice.toFixed(0))}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-lg line-through text-gray-400">₹{formatPrice(product.price)}</span>
                        )}
                      </div>
                      {product.discount > 0 && (
                        <p className="text-green-600 font-medium">
                          You save ₹{formatPrice((product.price - discountedPrice).toFixed(0))} ({product.discount}%)
                        </p>
                      )}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <Tabs defaultValue="specifications" className="mb-6">
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                        <TabsTrigger value="delivery">Delivery & Returns</TabsTrigger>
                      </TabsList>

                      <TabsContent value="specifications" className="mt-0">
                        <div className="space-y-3">
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="flex justify-between py-2 border-b border-gray-100"
                          >
                            <span className="text-gray-500">Brand</span>
                            <span className="font-medium">{product.brand}</span>
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="flex justify-between py-2 border-b border-gray-100"
                          >
                            <span className="text-gray-500">Category</span>
                            <span className="font-medium">{product.category}</span>
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="flex justify-between py-2 border-b border-gray-100"
                          >
                            <span className="text-gray-500">Battery Life</span>
                            <span className="font-medium">{product.batteryLife} Hours Playback</span>
                          </motion.div>
                        </div>
                      </TabsContent>

                      <TabsContent value="delivery" className="mt-0">
                        <div className="space-y-4">
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-medium">Free Delivery</p>
                              <p className="text-sm text-gray-500">Delivery within 3-5 business days</p>
                            </div>
                          </motion.div>

                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="flex items-start gap-3"
                          >
                            <Check className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-medium">7 Days Replacement</p>
                              <p className="text-sm text-gray-500">Easy returns if you change your mind</p>
                            </div>
                          </motion.div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="mb-6"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <h3 className="font-medium">Check Delivery Availability</h3>
                      </div>
                      <div className="flex gap-2">
                        <Input type="text" placeholder="Enter postal code" className="flex-1" />
                        <Button variant="outline">Check</Button>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="mt-auto space-y-3"
                    >
                      <Button 
                        className={`w-full ${isAddingToCart ? 'bg-green-600' : 'bg-black'} hover:bg-gray-800 text-white h-12 relative overflow-hidden transition-colors duration-300`}
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                      >
                        <AnimatePresence mode="wait">
                          {isAddingToCart ? (
                            <motion.div
                              key="adding"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-2"
                            >
                              <Check className="h-5 w-5" />
                              Added to Cart
                            </motion.div>
                          ) : (
                            <motion.div
                              key="add"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.2 }}
                            >
                              Add to Cart
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full bg-gray-900 hover:bg-black text-white h-12"
                          onClick={() => navigate("/buynow", { state: { product } })}
                        >
                          Buy Now
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Product Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="mt-6 border-none shadow-lg">
            <CardContent className="p-6 lg:p-10">
              <h2 className="text-2xl font-bold mb-6">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <ul className="space-y-2">
                    {["Premium sound quality with deep bass", 
                      "Bluetooth 5.0 for stable connection", 
                      "Water and dust resistant (IP67 rated)", 
                      "Touch controls for easy operation"].map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                        className="flex items-start gap-2"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">What's in the Box</h3>
                  <ul className="space-y-2">
                    {[`1 x ${product.name}`, 
                      "1 x USB-C Charging Cable", 
                      "3 x Pairs of Ear Tips (S, M, L)", 
                      "1 x User Manual"].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                        className="flex items-start gap-2"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetails
