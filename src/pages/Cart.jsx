import React from "react";
import { useCart } from "../context/CartContext";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div
      className="cart-page"
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
      <div
        className="cart-header"
        style={{ marginTop: "2rem", marginBottom: "3rem" }}
      >
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
          Your Cart
        </h1>
      </div>

      <div
        className="cart-body"
        style={{ display: "flex", gap: "4rem", alignItems: "flex-start" }}
      >
        {/* Left: Cart Items */}
        <div
          className="cart-items"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {cartItems.length === 0 ? (
            <div
              className="glass-card"
              style={{
                padding: "4rem",
                textAlign: "center",
                borderRadius: "2rem",
                fontSize: "1.25rem",
                opacity: 0.5,
                fontWeight: 500,
              }}
            >
              Your cart is currently empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="glass-card cart-item"
                style={{
                  display: "flex",
                  gap: "2rem",
                  padding: "1.5rem",
                  borderRadius: "2rem",
                  alignItems: "center",
                }}
              >
                <Link
                  to={`/sneaker/${item.id}`}
                  className="cursor-hover"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    background: "var(--metal-200)",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-metallic"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Link>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <Link
                        to={`/sneaker/${item.id}`}
                        className="cursor-hover"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <h2
                          className="font-syne"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            margin: 0,
                          }}
                        >
                          {item.title}
                        </h2>
                      </Link>
                      <div
                        style={{
                          fontSize: "1rem",
                          opacity: 0.6,
                          marginTop: "0.25rem",
                        }}
                      >
                        Size: {item.size}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="cursor-hover"
                      style={{
                        background: "rgba(255,59,48,0.1)",
                        color: "#ff3b30",
                        border: "none",
                        padding: "0.75rem",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      marginTop: "auto",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                      ${item.price}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        background: "rgba(0,0,0,0.05)",
                        padding: "0.5rem",
                        borderRadius: "999px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="cursor-hover"
                        style={{
                          background: "white",
                          border: "none",
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Minus size={16} />
                      </button>
                      <span
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 600,
                          minWidth: "1.5rem",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="cursor-hover"
                        style={{
                          background: "var(--metal-900)",
                          color: "white",
                          border: "none",
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Order Summary */}
        <div
          className="glass-card cart-summary"
          style={{
            width: "400px",
            padding: "3rem",
            borderRadius: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            position: "sticky",
            top: "2rem",
          }}
        >
          <h2
            className="font-syne"
            style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}
          >
            Summary
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              paddingBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.125rem",
                opacity: 0.7,
              }}
            >
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.125rem",
                opacity: 0.7,
              }}
            >
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.5rem",
              fontWeight: 800,
            }}
          >
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <button
            className="btn-chrome cursor-hover"
            disabled={cartItems.length === 0}
            style={{
              padding: "2px",
              border: "none",
              background: "transparent",
              width: "100%",
              opacity: cartItems.length === 0 ? 0.5 : 1,
            }}
          >
            <div
              className="btn-chrome-inner"
              style={{
                padding: "1.25rem",
                fontSize: "1.125rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Checkout
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
