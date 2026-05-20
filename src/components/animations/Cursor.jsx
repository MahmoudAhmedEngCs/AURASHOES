import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const [enabled, setEnabled] = useState(true);
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;

    if (isCoarsePointer) {
      setEnabled(false);
      return undefined;
    }

    const applyStyles = () => {
      const el = cursorRef.current;
      if (!el) return;
      const { x, y } = positionRef.current;
      const isHovering = hoveringRef.current;

      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      el.style.mixBlendMode = isHovering ? "exclusion" : "difference";

      const innerEl = el.firstElementChild;
      if (innerEl) {
        innerEl.style.transform = isHovering ? "scale(4)" : "scale(1)";
        innerEl.style.backgroundColor = isHovering ? "#fff" : "#1a1c1e";
      }

      rafRef.current = null;
    };

    const scheduleUpdate = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(applyStyles);
    };

    const handleMouseMove = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      scheduleUpdate();
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, .cursor-hover")) {
        hoveringRef.current = true;
        scheduleUpdate();
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest("a, button, .cursor-hover")) {
        hoveringRef.current = false;
        scheduleUpdate();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "12px",
        height: "12px",
        pointerEvents: "none",
        zIndex: 1000,
        transform: "translate(-100px, -100px) translate(-50%, -50%)",
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1c1e",
          borderRadius: "50%",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease",
          willChange: "transform, background-color",
          transform: "scale(1)",
        }}
      />
    </div>
  );
};

export default Cursor;
