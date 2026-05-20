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

const PageLoader = ({ text = "LOADING AURA" }) => (
  <div
    style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "2rem",
      pointerEvents: "auto",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "70px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer spinning gradient ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          padding: "3px",
          background: "conic-gradient(from 0deg, transparent 30%, #7a828e 60%, #1a1c1e 90%, #fff 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "spin-loader 1s linear infinite",
        }}
      />
      {/* Inner pulsing liquid dot */}
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1a1c1e 0%, #7a828e 100%)",
          boxShadow: "0 0 15px rgba(26, 28, 30, 0.4), 0 0 30px rgba(122, 130, 142, 0.2)",
          animation: "pulse-loader 1.4s ease-in-out infinite",
        }}
      />
    </div>

    {/* Pulsing gradient text */}
    <span
      className="font-syne text-gradient-metal"
      style={{
        fontWeight: 800,
        fontSize: "1.125rem",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        animation: "text-pulse-loader 1.6s ease-in-out infinite",
        display: "inline-block",
        paddingLeft: "0.4em",
      }}
    >
      {text}
    </span>

    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin-loader {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-loader {
            0%, 100% { transform: scale(0.9); opacity: 0.6; }
            50% { transform: scale(1.25); opacity: 1; }
          }
          @keyframes text-pulse-loader {
            0%, 100% { opacity: 0.4; transform: scale(0.98); }
            50% { opacity: 0.95; transform: scale(1.02); }
          }
        `,
      }}
    />
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
                <main id="main-content" style={{ flexGrow: 1, pointerEvents: "auto" }}>
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
                </main>
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
