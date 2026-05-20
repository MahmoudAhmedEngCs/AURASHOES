import React, { useState, useEffect, useRef } from "react";
import ProductGridCard from "../components/product/ProductGridCard";
import { getProductsPage } from "../services/db";
import gsap from "gsap";

const PAGE_SIZE = 8;

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const gridRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsPage(PAGE_SIZE);
      setProducts(data.products);
      setLastDoc(data.lastDoc);
      setHasMore(data.hasMore);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    const data = await getProductsPage(PAGE_SIZE, lastDoc);
    setProducts((prev) => [...prev, ...data.products]);
    setLastDoc(data.lastDoc);
    setHasMore(data.hasMore);
    setLoadingMore(false);
  };

  useEffect(() => {
    if (!loading && products.length > 0) {
      // Animate title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
      });

      // Animate products stagger
      gsap.from(".product-card-anim", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, [loading, products]);

  return (
    <div
      className="store-page"
      style={{
        minHeight: "100vh",
        padding: "140px 6rem 4rem",
        margin: "0 auto",
        width: "100%",
        maxWidth: "1536px",
        pointerEvents: "auto",
      }}
    >
      <div
        ref={titleRef}
        className="store-header"
        style={{ marginBottom: "4rem" }}
      >
        <div>
          <h1
            className="font-syne store-title"
            style={{
              fontSize: "4rem",
              fontWeight: 800,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
            }}
          >
            The Store
          </h1>
          <p
            className="store-subtitle"
            style={{
              fontSize: "1.25rem",
              opacity: 0.7,
              marginTop: "1rem",
              maxWidth: "600px",
            }}
          >
            Explore the full collection. Authentic sneakers, rare heat, and
            timeless classics.
          </p>
        </div>
      </div>

      {loading ? (
        <div
          className="store-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                height: "400px",
                borderRadius: "2rem",
                animation: "pulse 1.5s infinite",
                background: "rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>
      ) : (
        <div>
          <div
            ref={gridRef}
            className="store-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="product-card-anim">
                <ProductGridCard product={product} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <button
                type="button"
                onClick={handleLoadMore}
                className="btn-chrome cursor-hover"
                style={{ pointerEvents: "auto" }}
                disabled={loadingMore}
              >
                <div className="btn-chrome-inner">
                  {loadingMore ? "Loading..." : "Load more"}
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Store;
