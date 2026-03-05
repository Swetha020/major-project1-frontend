import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetails";
import { FurnitureProvider } from "./context/FurnitureContext";
import { CartProvider } from "./context/CartContext";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { ProfileProvider } from "./context/ProfileContext";
import { OrdersProvider } from "./context/OrdersContext";

export default function App() {
  return (
    <ProfileProvider>
      <FurnitureProvider>
        <CartProvider>
          <OrdersProvider>
            <Router>
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/categories/:category"
                  element={<Products />}
                />
               
                <Route path="/wishList" element={<WishList />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/products/:productId"
                  element={<ProductDetail />}
                />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
            </Router>
          </OrdersProvider>
        </CartProvider>
      </FurnitureProvider>
    </ProfileProvider>
  );
}
