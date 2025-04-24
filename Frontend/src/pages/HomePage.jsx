import { Suspense } from "react"
import Header from "../components/header"
import Adds from "../components/Adds"
import MetaData from "../components/MetaData"
import Footer from "../components/footer"
import SectionName from "../components/SectionName"
import DisplayProducts from "../components/NewArrivalProductsDisplay"
import BestDealProduct from "../components/bestDealProducts"
import "../index.css"

// You could lazy load heavier components for performance
// const BestDealProduct = lazy(() => import('../components/bestDealProducts'));

const Home = () => {
  return (
    <>
      <MetaData
        title={"Tech-Cube | Premium Electronics Store"}
        description="Shop the latest electronics, gadgets, and tech accessories at Tech-Cube"
      />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-[80px] md:pt-[100px]">
          {/* Hero Banner/Slider */}
          <Adds />

          {/* New Arrivals Section */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <SectionName name={"New Arrivals"} />
              <DisplayProducts />
            </div>
          </section>

          {/* Featured Categories - New Section */}
          <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
              <SectionName name={"Shop by Category"} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {["Smartphones", "Laptops", "Audio", "Accessories"].map((category) => (
                  <div
                    key={category}
                    className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="text-lg font-medium">{category}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Best Deals Section */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <SectionName name={"Today's Best Deals For You"} />
              <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading deals...</div>}>
                <BestDealProduct />
              </Suspense>
            </div>
          </section>

          {/* Testimonials - New Section */}
          <section className="py-12 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
              <SectionName name={"What Our Customers Say"} />
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center text-yellow-400 mb-4">{"★".repeat(5)}</div>
                    <p className="text-gray-600 mb-4">
                      "Great products and fast delivery! I'm very satisfied with my purchase from Tech-Cube."
                    </p>
                    <div className="font-medium">Happy Customer {i}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter - New Section */}
          <section className="py-12 bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Tech-Cube</h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for exclusive deals, new arrivals, and tech tips.
              </p>
              <form className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md flex-grow text-gray-800"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Home
