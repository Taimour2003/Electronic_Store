"use client"

import { useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, CreditCard, MapPin, Package, ShieldCheck, Truck } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const BuyNow = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Get products from location state (either as product, cartItems, or default)
  const products =
    location.state?.cartItems ||
    (location.state?.product
      ? [location.state.product]
      : [
          {
            _id: "123",
            name: "Premium Headphones",
            price: 199.99,
            images: ["/placeholder.jpg"],
            description: "High-quality wireless headphones with noise cancellation",
            quantity: 1,
          },
        ])

  const [showAddressForm, setShowAddressForm] = useState(false)
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("COD")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderStep, setOrderStep] = useState(1) // 1: Review, 2: Address, 3: Payment, 4: Confirm

  // Handle address input change
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  // Calculate subtotal
  const calculateSubtotal = () => {
    return products.reduce((total, item) => {
      const quantity = item.quantity || 1
      return total + item.price * quantity
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const shippingFee = 5
  const total = subtotal + shippingFee

  // Handle form submission
  const handleBuyNow = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const orderData = {
        products: products.map((product) => ({
          productId: product._id,
          quantity: product.quantity || 1,
          price: product.price,
        })),
        address,
        paymentMethod,
        totalAmount: total,
      }

      // In a real app, you'd use a relative URL or environment variable
      await axios.post("http://localhost:5000/api/orders/buyNow", orderData)

      setIsSubmitting(false)
      // Show success message and redirect
      navigate("/order-confirmation")
    } catch (error) {
      console.error("Error placing order:", error)
      setIsSubmitting(false)
      alert("❌ Failed to place order.")
    }
  }

  // Function to get image URL
  const getImageUrl = (product) => {
    return product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : `http://localhost:5000${product.images?.[0] || "/placeholder.jpg"}`
  }

  // Progress steps
  const steps = [
    { id: 1, name: "Review" },
    { id: 2, name: "Address" },
    { id: 3, name: "Payment" },
    { id: 4, name: "Confirm" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 md:px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="ghost"
            className="group flex items-center gap-2 hover:bg-black hover:text-white transition-all"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-center">Complete Your Purchase</h1>
          <div className="w-[72px]"></div> {/* Spacer for alignment */}
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                    ${orderStep >= step.id ? "bg-black text-white" : "bg-white text-gray-400 border border-gray-200"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {orderStep > step.id ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
                </motion.div>
                <span className={`text-xs mt-2 font-medium ${orderStep >= step.id ? "text-black" : "text-gray-400"}`}>
                  {step.name}
                </span>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-[40px] w-[calc(100%-20px)] h-[2px] bg-gray-200">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: orderStep > step.id ? "100%" : "0%" }}
                      className="h-full bg-black"
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Products and Checkout Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Products Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    {products.length} {products.length === 1 ? "item" : "items"} in your order
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="flex flex-col sm:flex-row gap-6 border-b pb-6 last:border-0 last:pb-0"
                    >
                      <div className="relative w-full sm:w-1/4 aspect-square rounded-md overflow-hidden bg-white">
                        <img
                          src={getImageUrl(product) || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-muted-foreground mt-2">{product.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">Quantity: {product.quantity || 1}</div>
                        </div>
                        <div className="mt-2 text-right font-medium">
                          Subtotal: ${(product.price * (product.quantity || 1)).toFixed(2)}
                        </div>
                        <div className="mt-4 flex items-center text-sm text-muted-foreground">
                          <Truck className="mr-2 h-4 w-4 text-green-600" />
                          <span>Free delivery within 2-3 business days</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Shipping Address</CardTitle>
                    <CardDescription>Where should we send your order?</CardDescription>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={showAddressForm ? "secondary" : "outline"}
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="transition-all duration-300"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {showAddressForm ? "Hide Form" : "Add Address"}
                    </Button>
                  </motion.div>
                </CardHeader>
                <AnimatePresence>
                  {showAddressForm && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <CardContent>
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                              id="street"
                              name="street"
                              value={address.street}
                              onChange={handleAddressChange}
                              placeholder="123 Main St, Apt 4B"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={address.city}
                              onChange={handleAddressChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State/Province</Label>
                            <Input
                              id="state"
                              name="state"
                              value={address.state}
                              onChange={handleAddressChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              value={address.country}
                              onChange={handleAddressChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={address.zipCode}
                              onChange={handleAddressChange}
                              className="mt-1"
                            />
                          </div>
                        </form>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select how you'd like to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:shadow-md">
                        <RadioGroupItem value="COD" id="COD" className="sr-only" />
                        <Package className="h-6 w-6" />
                        <Label htmlFor="COD" className="font-medium cursor-pointer">
                          Cash on Delivery
                        </Label>
                        <span className="text-xs text-muted-foreground text-center">Pay when you receive</span>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:shadow-md">
                        <RadioGroupItem value="Credit/Debit" id="Credit/Debit" className="sr-only" />
                        <CreditCard className="h-6 w-6" />
                        <Label htmlFor="Credit/Debit" className="font-medium cursor-pointer">
                          Credit/Debit Card
                        </Label>
                        <span className="text-xs text-muted-foreground text-center">Secure payment</span>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:shadow-md">
                        <RadioGroupItem value="UPI" id="UPI" className="sr-only" />
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 8L15 16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 8L9 16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <Label htmlFor="UPI" className="font-medium cursor-pointer">
                          UPI
                        </Label>
                        <span className="text-xs text-muted-foreground text-center">Fast and convenient</span>
                      </div>
                    </motion.div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-1"
          >
            <Card className="sticky top-4 overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-gray-50">
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {products.length} {products.length === 1 ? "item" : "items"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {products.map((product, index) => (
                  <motion.div
                    key={`summary-${product._id || index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {product.name} {product.quantity > 1 ? `(${product.quantity})` : ""}
                    </span>
                    <span>${(product.price * (product.quantity || 1)).toFixed(2)}</span>
                  </motion.div>
                ))}

                <Separator />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="flex justify-between"
                >
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  className="flex justify-between"
                >
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                  className="flex justify-between"
                >
                  <span className="text-muted-foreground">Tax</span>
                  <span>Included</span>
                </motion.div>

                <Separator />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                  className="flex justify-between font-bold text-lg"
                >
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="pt-4"
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      className="w-full h-12 text-base bg-black hover:bg-gray-800 text-white"
                      onClick={handleBuyNow}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        "Confirm Purchase"
                      )}
                    </Button>
                  </motion.div>

                  <div className="flex items-center justify-center gap-2 text-xs text-center text-muted-foreground mt-4">
                    <ShieldCheck className="h-4 w-4" />
                    <p>Secure checkout with 100% purchase protection</p>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs text-center text-muted-foreground mt-2 cursor-help underline decoration-dotted">
                          By confirming your purchase, you agree to our Terms of Service
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          Your purchase is subject to our Terms of Service and Privacy Policy. All orders are processed
                          securely and your information is protected.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BuyNow
