"use client"
import { useCart } from "@/store/ContextStore"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react"

const AddToCart = () => {
  const navigate = useNavigate()
  const { cartItems, setCartItems } = useCart()

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item)),
    )
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="flex items-center justify-center mb-8">
          <ShoppingCart className="w-8 h-8 mr-3 text-rose-500" />
          <h1 className="text-4xl font-bold text-gray-800">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
              <p className="text-xl text-gray-500">Your cart is empty</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-3 bg-rose-500 text-white rounded-lg font-medium transition-all hover:bg-rose-600"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in your cart
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-gray-500 mt-1">Price: Rs. {item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center bg-gray-50 rounded-full p-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-rose-500 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-10 text-center font-medium"
                      >
                        {item.quantity}
                      </motion.span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-rose-500 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="flex flex-col items-end">
                      <motion.p
                        key={item.quantity * item.price}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="font-semibold text-gray-800"
                      >
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </motion.p>
                      <motion.button
                        whileHover={{ scale: 1.05, color: "#ef4444" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center mt-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        <span className="text-sm">Remove</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Total:</h2>
                <motion.p
                  key={getTotalPrice()}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-rose-600"
                >
                  Rs. {getTotalPrice().toLocaleString()}
                </motion.p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-medium text-lg shadow-md transition-all flex items-center justify-center"
                onClick={() => navigate("/buynow", { state: { cartItems } })}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default AddToCart
