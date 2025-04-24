import Home from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/createAccountPage";
import Login from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/productDetailPage";
import AddToCart from "./pages/AddToCart";
import BuyNow from "./pages/buynow";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/addProduct" element={<AddProduct/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/product-details" element={<ProductDetails/>} />
      <Route path="/AddToCart" element={<AddToCart/>} />
      <Route path="/buynow" element={<BuyNow/>} />
    </Routes>
  );
};

export default App;
