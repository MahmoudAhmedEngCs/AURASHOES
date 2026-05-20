import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

import { Toaster } from "react-hot-toast";

const Cursor = React.lazy(() => import("./components/animations/Cursor"));
const LiquidBackground = React.lazy(
  () => import("./components/animations/LiquidBackground"),
);

// Pages
const Home = React.lazy(() => import("./pages/Home"));
const Store = React.lazy(() => import("./pages/Store"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Login = React.lazy(() => import("./pages/Login"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));

// Simple ScrollToTop wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageLoader = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.125rem",
      opacity: 0.7,
      pointerEvents: "auto",
    }}
  >
    Loading...
  </div>
);

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div
              style={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                overflow: "hidden",
              }}
            >
              {/* Background Elements (Persistent across routes) */}
              <div className="noise-overlay" />
              <Suspense fallback={null}>
                <Cursor />
              </Suspense>
              <Suspense fallback={null}>
                <LiquidBackground />
              </Suspense>

              {/* Foreground UI */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                  pointerEvents: "none",
                }}
              >
                <Navbar />

                {/* The Routes */}
                <div style={{ flexGrow: 1 }}>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/sneaker/:id" element={<ProductDetails />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                  </Suspense>
                </div>
              </div>

              {/* Global Overlays */}
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    background: "#1a1c1e",
                    color: "#fff",
                    borderRadius: "1rem",
                    padding: "1rem",
                  },
                }}
              />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
