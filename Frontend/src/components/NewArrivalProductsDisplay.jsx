"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, Grid, List, SlidersHorizontal } from "lucide-react"
import ProductCard from "./productCard"

const DisplayProducts = () => {
  const [view, setView] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  // Example categories - in a real app, you might fetch these from your API
  const categories = ["Smartphones", "Laptops", "Audio", "Wearables", "Cameras", "TVs", "Accessories"]

  // Toggle category selection
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Handle price range change
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newRange)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 5000])
    setSearchQuery("")
    setSortBy("featured")
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4 mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the Latest Tech</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore our wide range of premium electronics and find the perfect device for your needs.
          </p>
          <div className="mt-8 relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-3 px-5 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-3.5 text-gray-500 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 mr-4"
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                title="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                title="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-64 bg-white p-6 rounded-xl shadow-sm transition-all duration-300 ${
              filterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" /> Filters
              </h3>
              <button onClick={resetFilters} className="text-sm text-blue-600 hover:text-blue-800">
                Reset All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
              <div className="relative mb-4">
                <div className="h-1 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-1 bg-blue-600 rounded-full"
                    style={{
                      left: `${(priceRange[0] / 5000) * 100}%`,
                      right: `${100 - (priceRange[1] / 5000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="min-price" className="block text-xs text-gray-500 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="block text-xs text-gray-500 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    min={priceRange[0]}
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Availability</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="in-stock" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700">
                    In Stock
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="on-sale" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <label htmlFor="on-sale" className="ml-2 text-sm text-gray-700">
                    On Sale
                  </label>
                </div>
              </div>
            </div>

            {/* Apply Filters Button (Mobile) */}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg lg:hidden"
              onClick={() => setFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active filters */}
            {(selectedCategories.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 5000) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {category}
                    <button
                      type="button"
                      className="ml-1 inline-flex items-center p-0.5 text-blue-400 hover:bg-blue-200 hover:text-blue-900 rounded-full"
                      onClick={() => toggleCategory(category)}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button
                      type="button"
                      className="ml-1 inline-flex items-center p-0.5 text-blue-400 hover:bg-blue-200 hover:text-blue-900 rounded-full"
                      onClick={() => setPriceRange([0, 5000])}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    Search: {searchQuery}
                    <button
                      type="button"
                      className="ml-1 inline-flex items-center p-0.5 text-blue-400 hover:bg-blue-200 hover:text-blue-900 rounded-full"
                      onClick={() => setSearchQuery("")}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                {(selectedCategories.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 5000) && (
                  <button onClick={resetFilters} className="text-xs text-gray-500 hover:text-gray-700 underline">
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Render the ProductCard component */}
            <ProductCard />

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-blue-50 text-sm font-medium text-blue-600"
                >
                  1
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  3
                </a>
                <span className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  8
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  9
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  10
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayProducts
