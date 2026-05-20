import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, User, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isDark = location.pathname === "/" || location.pathname === "/login";

  const textColor = isDark ? "#fff" : "#1a1c1e";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const navBg = isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.4)";
  const navBorder = isDark
    ? "rgba(255, 255, 255, 0.15)"
    : "rgba(255, 255, 255, 0.6)";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <nav
        className="gsap-slide-down pointer-events-auto site-nav"
        style={{
          width: "90%",
          maxWidth: "80rem",
          margin: "1rem auto 0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "9999px",
          padding: "1rem 2rem",
          background: navBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${navBorder}`,
          color: textColor,
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-syne cursor-hover"
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            textDecoration: "none",
            color: textColor,
          }}
        >
          AURA<span style={{ color: "#7a828e" }}>.</span>
        </Link>

        {/* Center Links - Premium Glass Pills */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: "0.5rem",
            fontWeight: 600,
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            padding: "0.35rem",
            borderRadius: "999px",
            border: `1px solid ${borderColor}`,
          }}
        >
          <Link
            to="/"
            className="cursor-hover"
            style={{
              textDecoration: "none",
              color: textColor,
              padding: "0.5rem 1.5rem",
              borderRadius: "999px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Home
          </Link>

          <Link
            to="/store"
            className="cursor-hover"
            style={{
              textDecoration: "none",
              color: textColor,
              padding: "0.5rem 1.5rem",
              borderRadius: "999px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Store
          </Link>
        </div>

        {/* Right Icons */}
        <div
          className="nav-icons"
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          {/* Wishlist Toggle */}
          <Link
            to="/wishlist"
            className="cursor-hover"
            aria-label="Wishlist"
            style={{
              background: "none",
              border: "none",
              color: textColor,
              position: "relative",
              textDecoration: "none",
            }}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: isDark ? "#fff" : "#1a1c1e",
                  color: isDark ? "#000" : "white",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Toggle */}
          <Link
            to="/cart"
            className="cursor-hover"
            aria-label="Cart"
            style={{
              background: "none",
              border: "none",
              color: textColor,
              position: "relative",
              textDecoration: "none",
            }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#ff3b30",
                  color: "white",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Toggle */}
          {user ? (
            <div
              className="nav-auth"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderLeft: `1px solid ${borderColor}`,
                paddingLeft: "1.5rem",
                marginLeft: "0.5rem",
              }}
            >
              <span
                className="nav-user-name"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="cursor-hover"
                style={{
                  background: "none",
                  border: "none",
                  color: "#ff3b30",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="cursor-hover nav-auth"
              style={{
                textDecoration: "none",
                color: textColor,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: 600,
                borderLeft: `1px solid ${borderColor}`,
                paddingLeft: "1.5rem",
                marginLeft: "0.5rem",
              }}
            >
              <User size={20} />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
