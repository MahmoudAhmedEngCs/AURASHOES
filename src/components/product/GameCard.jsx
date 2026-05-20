import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const GameCard = ({
  imageSrc,
  title,
  subtitle,
  style,
  className = "",
  speed = 0.05,
  imageLoading = "lazy",
  imageDecoding = "async",
  fetchPriority,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const setX = gsap.quickTo(card, "x", { duration: 0.8, ease: "power2.out" });
    const setY = gsap.quickTo(card, "y", { duration: 0.8, ease: "power2.out" });
    const setRotateX = gsap.quickTo(card, "rotateX", {
      duration: 0.8,
      ease: "power2.out",
    });
    const setRotateY = gsap.quickTo(card, "rotateY", {
      duration: 0.8,
      ease: "power2.out",
    });

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let frameId = null;
    let latest = { x: 0, y: 0 };

    const handleResize = () => {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight / 2;
    };

    const handleMouseMove = (e) => {
      latest = { x: e.clientX - centerX, y: e.clientY - centerY };
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        const x = latest.x * speed;
        const y = latest.y * speed;
        setX(x);
        setY(y);
        setRotateY(x * 0.05);
        setRotateX(-y * 0.05);
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [speed]);

  return (
    <div
      ref={cardRef}
      className={`parallax-element glass-card cursor-hover ${className}`}
      data-speed={speed}
      style={{
        position: "absolute",
        borderRadius: "2rem",
        overflow: "hidden",
        padding: "0.5rem",
        zIndex: 20,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "1.5rem",
          overflow: "hidden",
          position: "relative",
          animation: `floatCardHero 3s ease-in-out infinite alternate`,
        }}
      >
        <img
          src={imageSrc}
          alt={title}
          className="img-metallic"
          loading={imageLoading}
          decoding={imageDecoding}
          fetchPriority={fetchPriority}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "2rem 1.5rem 1.5rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            color: "white",
          }}
        >
          <h3
            className="font-syne"
            style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              opacity: 0.8,
              margin: 0,
              marginTop: "0.25rem",
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
