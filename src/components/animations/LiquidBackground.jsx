import React, { useEffect, useRef } from "react";
import paper from "paper";

const LiquidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let idleId = null;
    let timeoutId = null;
    let cleanup = () => {};

    const start = () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      paper.setup(canvasRef.current);

      const path = new paper.Path();

      path.fillColor = {
        gradient: {
          stops: ["#ffffff", "#f0f2f5", "#e8eaed"],
        },
        origin: [0, 0],
        destination: [paper.view.size.width, paper.view.size.height],
      };

      const center = paper.view.center;
      const radius =
        Math.min(paper.view.size.width, paper.view.size.height) * 0.45;
      const segments = 14;

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const point = center.add(
          new paper.Point({
            angle: (angle * 180) / Math.PI,
            length: radius,
          }),
        );
        path.add(point);
      }
      path.smooth();

      let mousePos = center.clone();

      const handleMouseMove = (e) => {
        mousePos = new paper.Point(e.clientX, e.clientY);
      };

      if (!prefersReducedMotion) {
        window.addEventListener("mousemove", handleMouseMove, {
          passive: true,
        });
      }

      if (!prefersReducedMotion) {
        paper.view.onFrame = function (event) {
          const time = event.time;
          const driftCenter = center.add(
            new paper.Point(
              Math.sin(time * 0.5) * 50,
              Math.cos(time * 0.4) * 50,
            ),
          );

          for (let i = 0; i < segments; i++) {
            const segment = path.segments[i];

            const angle = (i / segments) * Math.PI * 2;
            const sine = Math.sin(time * 1.5 + i * 1.2);
            const offset = sine * 20;

            const basePoint = driftCenter.add(
              new paper.Point({
                angle: (angle * 180) / Math.PI,
                length: radius + offset,
              }),
            );

            const vector = segment.point.subtract(mousePos);
            const distance = vector.length;

            const effectRadius = 250;

            if (distance < effectRadius) {
              const force = (effectRadius - distance) / effectRadius;
              const push = vector.normalize().multiply(force * 40);
              segment.point = segment.point.add(push.multiply(0.1));
            }

            const springForce = basePoint
              .subtract(segment.point)
              .multiply(0.04);
            segment.point = segment.point.add(springForce);
          }

          path.smooth({ type: "continuous" });
        };
      }

      paper.view.onResize = function () {
        path.position = paper.view.center;
        path.fillColor.destination = [
          paper.view.size.width,
          paper.view.size.height,
        ];
      };

      cleanup = () => {
        if (!prefersReducedMotion) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
        paper.project.clear();
      };
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(start, 250);
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="liquid-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "auto",
      }}
      data-paper-resize="true"
    />
  );
};

export default LiquidBackground;
