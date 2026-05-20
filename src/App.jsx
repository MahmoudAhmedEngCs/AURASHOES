import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LiquidBackground from './components/animations/LiquidBackground';
import Cursor from './components/animations/Cursor';
import Navbar from './components/layout/Navbar';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import { Toaster } from 'react-hot-toast';

// Simple ScrollToTop wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
              {/* Background Elements (Persistent across routes) */}
              <div className="noise-overlay" />
              <Cursor />
              <LiquidBackground />

              {/* Foreground UI */}
              <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh', pointerEvents: 'none' }}>
                <Navbar />
                
                {/* The Routes */}
                <div style={{ flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/sneaker/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                  </Routes>
                </div>
              </div>
              
              {/* Global Overlays */}
              <Toaster position="top-center" toastOptions={{ style: { background: '#1a1c1e', color: '#fff', borderRadius: '1rem', padding: '1rem' } }} />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
