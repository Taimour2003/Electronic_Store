"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import {
  FaUser,
  FaEnvelope,
  FaMobile,
  FaEdit,
  FaSignOutAlt,
  FaShieldAlt,
  FaPlus,
  FaHistory,
  FaHeart,
  FaShoppingBag,
} from "react-icons/fa"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        })
        setUser(response.data)
      } catch (error) {
        console.error("Error fetching profile:", error)
        navigate("/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true })
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  // Placeholder stats
  const userStats = {
    orders: 12,
    wishlist: 24,
    reviews: 8,
    points: 350,
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white shadow-xl rounded-2xl max-w-4xl w-full overflow-hidden"
      >
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
          <motion.div className="flex flex-col md:flex-row items-center" variants={itemVariants}>
            {/* Avatar with hover effect */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img
                  src={
                    user.avatar
                      ? `http://localhost:5000/${user.avatar}`
                      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=112&width=112"
                  }
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=112&width=112"
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <FaEdit className="text-white text-xl" />
              </div>
            </div>

            {/* User info */}
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-blue-100 flex items-center justify-center md:justify-start mt-1">
                <FaEnvelope className="mr-2" /> {user.email}
              </p>
              <p className="text-blue-100 flex items-center justify-center md:justify-start mt-1">
                <FaMobile className="mr-2" /> {user.mobile}
              </p>

              {/* User role badge */}
              <div className="mt-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === "admin" ? "bg-yellow-400 text-yellow-900" : "bg-blue-400 text-blue-900"
                  }`}
                >
                  {user.role === "admin" ? (
                    <>
                      <FaShieldAlt className="mr-1" /> Administrator
                    </>
                  ) : (
                    <>
                      <FaUser className="mr-1" /> User
                    </>
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                activeTab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <FaUser className="mr-2" /> Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                activeTab === "orders"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <FaShoppingBag className="mr-2" /> Orders
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                activeTab === "wishlist"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <FaHeart className="mr-2" /> Wishlist
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap transition-colors duration-200 ${
                activeTab === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <FaHistory className="mr-2" /> History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm"
                >
                  <p className="text-blue-500 text-sm font-medium">Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{userStats.orders}</p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl shadow-sm"
                >
                  <p className="text-indigo-500 text-sm font-medium">Wishlist</p>
                  <p className="text-2xl font-bold text-gray-800">{userStats.wishlist}</p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm"
                >
                  <p className="text-purple-500 text-sm font-medium">Reviews</p>
                  <p className="text-2xl font-bold text-gray-800">{userStats.reviews}</p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-sm"
                >
                  <p className="text-green-500 text-sm font-medium">Points</p>
                  <p className="text-2xl font-bold text-gray-800">{userStats.points}</p>
                </motion.div>
              </div>

              {/* Profile Details */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <span className="text-gray-500 md:w-1/4">Full Name:</span>
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <span className="text-gray-500 md:w-1/4">Email:</span>
                    <span className="font-medium text-gray-800">{user.email}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <span className="text-gray-500 md:w-1/4">Mobile:</span>
                    <span className="font-medium text-gray-800">{user.mobile}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <span className="text-gray-500 md:w-1/4">Role:</span>
                    <span className="font-medium text-gray-800 capitalize">{user.role}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <span className="text-gray-500 md:w-1/4">Member Since:</span>
                    <span className="font-medium text-gray-800">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                  onClick={() => navigate("/edit-profile")}
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </motion.button>

                {user?.role === "admin" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                    onClick={() => navigate("/addProduct")}
                  >
                    <FaPlus className="mr-2" /> Add Product
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <FaShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No orders yet</h3>
              <p className="text-gray-500 mt-2">When you place orders, they will appear here</p>
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors duration-200"
                onClick={() => navigate("/")}
              >
                Start Shopping
              </button>
            </motion.div>
          )}

          {activeTab === "wishlist" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <FaHeart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Your wishlist is empty</h3>
              <p className="text-gray-500 mt-2">Save items you like to your wishlist</p>
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors duration-200"
                onClick={() => navigate("/")}
              >
                Explore Products
              </button>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <FaHistory className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No browsing history</h3>
              <p className="text-gray-500 mt-2">Products you view will appear here</p>
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors duration-200"
                onClick={() => navigate("/")}
              >
                Browse Products
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage
