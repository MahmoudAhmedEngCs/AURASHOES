import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductGridCard from "../components/product/ProductGridCard";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div
      className="wishlist-page"
      style={{
        minHeight: "calc(100vh - 120px)",
        padding: "0 6rem",
        margin: "0 auto",
        width: "100%",
        maxWidth: "1536px",
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
        <h1
          className="font-syne"
          style={{
            fontSize: "4rem",
            fontWeight: 800,
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Heart size={48} fill="#ff3b30" color="#ff3b30" /> Your Wishlist
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            opacity: 0.7,
            marginTop: "1rem",
            fontWeight: 500,
          }}
        >
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}{" "}
          saved.
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: "6rem",
            textAlign: "center",
            borderRadius: "2rem",
            fontSize: "1.5rem",
            opacity: 0.5,
            fontWeight: 500,
          }}
        >
          Your wishlist is empty. Discover the collection and save your
          favorites.
        </div>
      ) : (
        <div
          className="wishlist-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {wishlistItems.map((product) => (
            <ProductGridCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
