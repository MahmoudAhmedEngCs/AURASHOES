import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GameCard from "../components/product/GameCard";
import Marquee from "../components/animations/Marquee";
import { ArrowRight, ShieldCheck, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".gsap-title", {
        y: 120,
        skewY: 8,
        duration: 1.4,
        stagger: 0.15,
        opacity: 0,
        delay: 0.2,
      })
        .from(
          ".gsap-reveal",
          { y: 40, opacity: 0, duration: 1.2, stagger: 0.1 },
          "-=1.0",
        )
        .from(
          ".parallax-element",
          { y: 100, opacity: 0, duration: 1.5, stagger: 0.2 },
          "-=1.2",
        )
        .from(".gsap-slide-up", { y: 20, opacity: 0, duration: 1 }, "-=1.0");

      // Removed feature-box GSAP animation to prevent conflict with CSS float animation

      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="home"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        pointerEvents: "auto",
      }}
    >
      {/* 1. HERO SECTION */}
      <section className="hero-section home-hero">
        {/* Left Text Column */}
        <div className="hero-content">
          <div className="overflow-hidden" style={{ marginBottom: "1.5rem" }}>
            <span
              className="gsap-reveal"
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Premium Sneaker Boutique
            </span>
          </div>

          <h1
            className="font-syne hero-title"
            style={{
              fontWeight: 800,
              fontSize: "clamp(4rem, 6vw, 6.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              marginBottom: "2rem",
              margin: 0,
            }}
          >
            <span className="reveal-mask">
              <span
                className="gsap-title block text-gradient-metal"
                style={{ display: "block" }}
              >
                Exclusive
              </span>
            </span>
            <br />
            <span className="reveal-mask">
              <span className="gsap-title block" style={{ display: "block" }}>
                Kicks.
              </span>
            </span>
          </h1>

          <div
            className="overflow-hidden"
            style={{ marginBottom: "3rem", maxWidth: "28rem" }}
          >
            <p
              className="gsap-reveal hero-text"
              style={{ fontSize: "1.125rem", lineHeight: 1.6, fontWeight: 500 }}
            >
              Discover the most hyped releases, rare grails, and daily heat.
              Your ultimate destination for authentic sneaker culture.
            </p>
          </div>

          <div className="reveal-mask" style={{ paddingTop: "0.5rem" }}>
            <Link
              to="/store"
              className="gsap-reveal btn-chrome cursor-hover group"
              style={{ display: "inline-flex" }}
            >
              <div className="btn-chrome-inner">
                <span>Enter Store</span>
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="hero-visual">
          <GameCard
            imageSrc="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop"
            title="Air Jordan 1 High"
            subtitle="Retro / Classic"
            speed={0.04}
            className="hero-card hero-card-main"
            imageLoading="eager"
            fetchPriority="high"
          />
          <GameCard
            imageSrc="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop"
            title="Nike Dunk Low"
            subtitle="Limited Edition"
            speed={-0.02}
            className="hero-card hero-card-secondary"
            imageLoading="lazy"
          />
        </div>

        <div
          className="gsap-slide-up pointer-events-auto hero-scroll-hint"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          SCROLL TO EXPLORE ↓
        </div>
      </section>

      {/* 2. MARQUEE SECTION */}
      <section style={{ padding: "4rem 0", overflow: "hidden" }}>
        <Marquee
          text="Jordan • Yeezy • Nike Dunk • New Balance • Asics • Off-White"
          speed={25}
        />
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="features-section">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes floatFeature {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-12px); }
          }
          @keyframes floatCardHero {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-20px); }
          }
        `,
          }}
        />
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h2
            className="font-syne features-title"
            style={{
              fontSize: "3.5rem",
              fontWeight: 800,
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            Why <span className="text-gradient-metal">AURA.KICKS</span>
          </h2>
          <p
            className="features-text"
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            We provide a premium experience for sneakerheads, ensuring
            authenticity, speed, and exclusive access to the best drops.
          </p>
        </div>

        <div className="features-grid">
          {[
            {
              icon: <ShieldCheck size={36} color="#1a1c1e" />,
              title: "100% Authentic",
              desc: "Every pair is rigorously verified by our team of experts before reaching your hands.",
            },
            {
              icon: <Zap size={36} color="#1a1c1e" />,
              title: "Fast Shipping",
              desc: "Express delivery worldwide. Get your heat delivered fast and securely.",
            },
            {
              icon: <Star size={36} color="#1a1c1e" />,
              title: "Exclusive Access",
              desc: "Members get early access to limited releases and special restocks.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="feature-box glass-card"
              style={{
                padding: "3rem",
                borderRadius: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                animation: `floatFeature 3.5s ease-in-out ${idx * 0.3}s infinite alternate`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animationPlayState = "paused";
                e.currentTarget.style.transform =
                  "translateY(-20px) scale(1.05) perspective(1000px) rotateX(5deg) rotateY(-5deg)";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animationPlayState = "running";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.background = "";
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {feature.icon}
              </div>
              <h3
                className="font-syne"
                style={{ fontSize: "1.5rem", fontWeight: 700 }}
              >
                {feature.title}
              </h3>
              <p style={{ color: "#4b5563", lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <section className="cta-section">
        {/* Background Noise for dark section */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.8\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E")',
            opacity: 0.05,
            pointerEvents: "none",
          }}
        ></div>

        <div
          className="cta-content"
          style={{ position: "relative", zIndex: 10, maxWidth: "800px" }}
        >
          <h2
            className="font-syne cta-title"
            style={{
              fontWeight: 800,
              lineHeight: 1,
              marginBottom: "2rem",
              textTransform: "uppercase",
            }}
          >
            Elevate Your <br /> Rotation.
          </h2>
          <p
            className="cta-text"
            style={{ color: "#9ca3af", marginBottom: "3rem" }}
          >
            Don't miss out on the latest drops. Step up your game with our
            curated selection of premium sneakers.
          </p>
          <Link
            to="/store"
            className="cta-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              background: "white",
              color: "black",
              borderRadius: "999px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              textDecoration: "none",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Shop Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
