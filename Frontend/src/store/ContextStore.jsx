import { createContext,useState,useContext } from "react";

// Create Context
const ImagesContext = createContext();
const CartContext=createContext();
// Provider Component
const ImageProvider = ({ children }) => {
  const images =[
    {
      id: 1,
      name: "Apple MacBook Air M2",
      price: 999,
      originalPrice: 1199,
      discount: 17,
      features: "13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD",
      rating: 4.8,
      image: "/images/bgc.jpeg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      price: 1199,
      originalPrice: 1399,
      discount: 14,
      features: "6.8-inch Dynamic AMOLED, 12GB RAM, 256GB Storage",
      rating: 4.7,
      image: "/images/fab.jpeg",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Wireless Headphones",
      price: 349,
      originalPrice: 399,
      discount: 13,
      features: "Industry-leading noise cancellation, 30-hour battery life",
      rating: 4.9,
      image: "/images/image3.jpeg",
    },
    {
      id: 4,
      name: "iPad Pro 12.9-inch M2",
      price: 1099,
      originalPrice: 1299,
      discount: 15,
      features: "Liquid Retina XDR display, M2 chip, 128GB Storage",
      rating: 4.8,
      image: "/images/image3.jpeg",
    },
    {
      id: 5,
      name: "Dell XPS 15 Laptop",
      price: 1499,
      originalPrice: 1799,
      discount: 17,
      features: "15.6-inch 4K OLED, Intel i7, 16GB RAM, 512GB SSD",
      rating: 4.6,
      image: "/images/bgc.jpeg",
    },
    {
      id: 6,
      name: "Bose QuietComfort Earbuds II",
      price: 249,
      originalPrice: 299,
      discount: 17,
      features: "Wireless noise cancelling earbuds with personalized sound",
      rating: 4.7,
      image: "/images/fab.jpeg",
    },
  ];


  const addImage = [
    "./camera-510530_1920.jpg",
    "./pexels-cottonbro-5054211.jpg",
    "./microphone-5340340_1280.jpg",
    "./headphones-5596987_1280.jpg",
  ];

 

  return (
    <ImagesContext.Provider value={{ images, addImage }}>
      {children}
    </ImagesContext.Provider>
  );
};


const CartItemsProvider=({children})=>{
  const [cartItems,setCartItems]=useState([]);

  const addItem=(item)=>{
    setCartItems((prev)=>[...cartItems,item]);
  }
  return (
    <CartContext.Provider value={{cartItems,addItem,setCartItems}}>
      {children}
    </CartContext.Provider>
  )
}

export const AppProvider=({children})=>{
  return(
    <CartItemsProvider>
      <ImageProvider>
        {children}
      </ImageProvider>
    </CartItemsProvider>
  )
}

export const useCart = () => useContext(CartContext);
export const useImages = () => useContext(ImagesContext);
