"use client"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import { Pagination, Autoplay, Navigation } from "swiper/modules"
import { useImages } from "../store/ContextStore"
import { Loader2 } from "lucide-react"

const Adds = () => {
  const { addImage } = useImages()
  const [loadedImages, setLoadedImages] = useState({})
  const [errorImages, setErrorImages] = useState({})
  const [isClient, setIsClient] = useState(false)

  // Handle SSR
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Function to handle image loading
  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }))
  }

  // Function to handle image loading errors
  const handleImageError = (index) => {
    setErrorImages((prev) => ({
      ...prev,
      [index]: true,
    }))
  }

  // Don't render on server
  if (!isClient) {
    return null
  }

  return (
    <div className="carousel-container relative">
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={800}
        preloadImages={false}
        lazy={{
          loadPrevNext: true,
          loadPrevNextAmount: 1,
        }}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        {addImage.map((img, index) => (
          <SwiperSlide key={index} className="bg-gray-100">
            <div className="relative w-full aspect-[16/6] overflow-hidden">
              {/* Loading state */}
              {!loadedImages[index] && !errorImages[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
                </div>
              )}

              {/* Error state */}
              {errorImages[index] && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-gray-500">Failed to load image</p>
                </div>
              )}

              {/* Actual image with loading and error handlers */}
              <img
                src={img || "/placeholder.svg"}
                alt={`Slide ${index + 1}`}
                className={`w-full h-full object-contain md:object-contain transition-opacity duration-300 ${
                  loadedImages[index] ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Show placeholder if no images */}
        {(!addImage || addImage.length === 0) && (
          <SwiperSlide>
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default Adds
