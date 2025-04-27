"use client"
import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import {
  Upload,
  X,
  Check,
  Loader2,
  ShoppingBag,
  Star,
  MessageSquare,
  DollarSign,
  FileText,
  Tag,
  Briefcase,
  Package,
} from "lucide-react"

const AddProduct = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [product, setProduct] = useState({
    name: "",
    rating: "",
    reviews: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
  })

  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [formProgress, setFormProgress] = useState(0)

  // Calculate form completion progress
  React.useEffect(() => {
    const fields = Object.values(product).filter(Boolean).length
    const totalFields = Object.keys(product).length
    const imageField = image ? 1 : 0
    setFormProgress(Math.round(((fields + imageField) / (totalFields + 1)) * 100))
  }, [product, image])

  // Handle Input Change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image
  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Submit Form with Axios
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Validate user input
    for (const key in product) {
      if (!product[key]) {
        setMessage(`Please fill in all fields (${key} is missing).`)
        setLoading(false)
        return
      }
    }

    if (!image) {
      setMessage("Please upload an image.")
      setLoading(false)
      return
    }

    try {
      const API_URL = "http://localhost:5000"
      const formData = new FormData()

      for (const key in product) {
        formData.append(key, product[key])
      }
      formData.append("image", image)

      const { data } = await axios.post(`${API_URL}/api/products/addproduct`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })

      setMessage("Product added successfully!")
      setProduct({
        name: "",
        rating: "",
        reviews: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        stock: "",
      })
      setImage(null)
      setImagePreview(null)

      setTimeout(() => navigate("/"), 2000)
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message)
      setMessage(`${error.response?.data?.error || "Error adding product"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-indigo-100 p-4 sm:p-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 max-w-3xl w-full"
      >
        <div className="flex items-center justify-center mb-6">
          <ShoppingBag className="h-8 w-8 text-rose-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${formProgress}%` }}
            className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full"
          />
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 mb-6 text-center rounded-lg ${
              message.includes("successfully")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            <div className="flex items-center justify-center">
              {message.includes("successfully") ? <Check className="w-5 h-5 mr-2" /> : <X className="w-5 h-5 mr-2" />}
              {message}
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <div className="relative">
                  <ShoppingBag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      type="number"
                      name="rating"
                      placeholder="1-5"
                      min="1"
                      max="5"
                      value={product.rating}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Reviews</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      type="number"
                      name="reviews"
                      placeholder="Reviews"
                      value={product.reviews}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price (Rs.)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    name="description"
                    placeholder="Product Description"
                    value={product.description}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all duration-200 min-h-[120px]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type="number"
                    name="stock"
                    placeholder="Stock Quantity"
                    value={product.stock}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Image upload area */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    dragActive ? "border-rose-400 bg-rose-50" : "border-gray-300"
                  } transition-all duration-200 cursor-pointer`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative">
                      <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={imagePreview}
                        alt="Product preview"
                        className="mx-auto h-40 object-contain rounded-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage()
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Drag and drop an image or click to browse</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-indigo-500 text-white py-3 rounded-lg hover:from-rose-600 hover:to-indigo-600 transition-all duration-300 font-medium text-lg mt-6 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Adding Product...
              </>
            ) : (
              "Add Product"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default AddProduct
