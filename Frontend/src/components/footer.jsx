"use client"

import { useState } from "react"
import {
  ArrowUp,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  Send,
  CreditCard,
  Zap,
} from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Implement your newsletter subscription logic here
    alert(`Thank you for subscribing with: ${email}`)
    setEmail("")
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section with Logo and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 pb-10 border-b border-gray-200">
          {/* Logo and Tagline */}
          <div className="mb-8 lg:mb-0">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-800">Tech-Cube</span>
            </div>
            <p className="mt-3 text-gray-600 max-w-md">
              Your one-stop destination for premium electronics and tech accessories. Quality products, exceptional
              service.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>1-800-TECH-CUBE</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@tech-cube.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full lg:w-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Subscribe to our Newsletter</h3>
            <p className="text-gray-600 mb-4">Get the latest updates, deals and exclusive offers</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-3 w-full lg:w-64 rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-md transition-colors flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Know Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">KNOW US</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  About Tech-Cube
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Press & Media
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Our Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Helpdesk */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">HELPDESK</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Warranty Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Return and Exchange Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Privacy & Security Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Network */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">NETWORK</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Corporate Gifting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  Franchise Opportunities
                </a>
              </li>
            </ul>
          </div>

          {/* Socials and App Download */}
          <div>
            {/* Socials */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">FOLLOW US ON</h3>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="p-2 bg-white hover:bg-blue-600 hover:text-white text-gray-600 rounded-full shadow-sm transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white hover:bg-blue-600 hover:text-white text-gray-600 rounded-full shadow-sm transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white hover:bg-blue-600 hover:text-white text-gray-600 rounded-full shadow-sm transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white hover:bg-blue-600 hover:text-white text-gray-600 rounded-full shadow-sm transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white hover:bg-blue-600 hover:text-white text-gray-600 rounded-full shadow-sm transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* App Download */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">DOWNLOAD OUR APP</h3>
              <div className="flex space-x-3">
                <a href="#" className="transition-transform hover:scale-105">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                    alt="Google Play"
                    className="h-10"
                  />
                </a>
                <a href="#" className="transition-transform hover:scale-105">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png"
                    alt="App Store"
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-200 pt-8 pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">SECURE PAYMENT OPTIONS</h3>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white p-2 rounded-md shadow-sm">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8" />
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" className="h-8" />
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8" />
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm">
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968299.png" alt="Apple Pay" className="h-8" />
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm">
              <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Google Pay" className="h-8" />
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-8 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Tech-Cube. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Cookies
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  )
}
