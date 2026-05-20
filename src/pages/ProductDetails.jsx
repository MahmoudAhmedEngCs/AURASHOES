import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
import { getProductById } from "../services/db";
import gsap from "gsap";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("42");
  const sizes = ["39", "40", "41", "42", "43", "44", "45"];

  const imagePaneRef = useRef(null);
  const detailsPaneRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!loading && product) {
      gsap.fromTo(
        imagePaneRef.current,
        { opacity: 0, x: -50, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
      );
      gsap.fromTo(
        detailsPaneRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 },
      );

      // Animate staggered children in details pane
      gsap.fromTo(
        ".stagger-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    }
  }, [loading, product]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
      >
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
      >
        Product not found
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);

  return (
    <div
      className="product-details"
      style={{
        minHeight: "100vh",
        display: "flex",
        pointerEvents: "auto",
        paddingTop: "100px",
      }}
    >
      {/* Left: Image Showcase - Adjusted Size */}
      <div
        ref={imagePaneRef}
        className="product-image-pane"
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 4rem",
          opacity: 0,
        }}
      >
        <div
          className="product-image"
          style={{
            width: "100%",
            maxWidth: "600px",
            maxHeight: "70vh",
            aspectRatio: "4/5",
            borderRadius: "2rem",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="img-metallic"
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Right: Details Panel - Better typography and spacing */}
      <div
        ref={detailsPaneRef}
        className="product-info-pane"
        style={{
          flex: 1,
          padding: "2rem 4rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          overflowY: "auto",
          opacity: 0,
        }}
      >
        <div className="stagger-item">
          <div
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.5,
              marginBottom: "1rem",
            }}
          >
            {product.brand} • {product.category}
          </div>
          <h1
            className="font-syne"
            style={{
              fontSize: "4rem",
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {product.title}
          </h1>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: 600,
              marginTop: "1.5rem",
              color: "#ff3b30",
            }}
          >
            ${product.price}
          </div>
        </div>

        <p
          className="stagger-item"
          style={{
            fontSize: "1.25rem",
            opacity: 0.7,
            lineHeight: 1.6,
            maxWidth: "90%",
          }}
        >
          {product.description}
        </p>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="stagger-item" style={{ marginTop: "0.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "1rem",
                opacity: 0.5,
                letterSpacing: "0.1em",
              }}
            >
              Available Colors
            </h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              {product.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="cursor-hover"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    background: color,
                    border: "3px solid white",
                    boxShadow:
                      "0 8px 16px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.5)",
                    transition:
                      "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform =
                      "scale(1.2) translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1) translateY(0)")
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        <div className="stagger-item" style={{ marginTop: "0.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "uppercase",
                opacity: 0.5,
                letterSpacing: "0.1em",
              }}
            >
              Select Size
            </h3>
          </div>
          <div
            className="product-size-grid"
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          >
            {sizes.map((size) => (
              <button
                key={size}
                className="cursor-hover"
                onClick={() => setSelectedSize(size)}
                style={{
                  width: "4.5rem",
                  height: "4.5rem",
                  borderRadius: "1rem",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  background:
                    selectedSize === size
                      ? "var(--metal-900)"
                      : "rgba(255,255,255,0.05)",
                  color: selectedSize === size ? "white" : "inherit",
                  border:
                    selectedSize === size
                      ? "none"
                      : "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div
          className="stagger-item product-actions"
          style={{
            display: "flex",
            gap: "1.5rem",
            marginTop: "auto",
            paddingTop: "3rem",
            paddingBottom: "2rem",
          }}
        >
          <button
            className="btn-chrome cursor-hover product-add"
            onClick={() => addToCart(product, selectedSize)}
            style={{
              flex: 1,
              padding: "2px",
              border: "none",
              background: "transparent",
            }}
          >
            <div
              className="btn-chrome-inner"
              style={{
                padding: "1.5rem",
                fontSize: "1.25rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
                borderRadius: "1.5rem",
              }}
            >
              Add to Cart
            </div>
          </button>

          <button
            className="cursor-hover product-wishlist-btn"
            onClick={() => toggleWishlist(product)}
            style={{
              width: "5.5rem",
              height: "5.5rem",
              borderRadius: "1.5rem",
              border: "none",
              background: isLiked
                ? "rgba(255,59,48,0.1)"
                : "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
          >
            <Heart
              size={32}
              fill={isLiked ? "#ff3b30" : "none"}
              color={isLiked ? "#ff3b30" : "currentColor"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
