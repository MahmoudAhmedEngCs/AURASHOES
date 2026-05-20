import React, { useEffect, useRef } from 'react';
import paper from 'paper';

const LiquidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Paper.js
    paper.setup(canvasRef.current);

    // Create the fluid blob path
    const path = new paper.Path();

    // Define a very subtle metallic linear gradient
    path.fillColor = {
      gradient: {
        stops: ['#ffffff', '#f0f2f5', '#e8eaed']
      },
      origin: [0, 0],
      destination: [paper.view.size.width, paper.view.size.height]
    };

    const center = paper.view.center;
    // Blob size relative to screen
    const radius = Math.min(paper.view.size.width, paper.view.size.height) * 0.45;
    const segments = 14;

    // Initialize path segments in a circle
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const point = center.add(new paper.Point({
        angle: angle * 180 / Math.PI,
        length: radius
      }));
      path.add(point);
    }
    path.smooth();

    // Track mouse for physics interaction
    let mousePos = center.clone();
    
    // Add event listener to window instead of paper.view for better global tracking
    const handleMouseMove = (e) => {
      mousePos = new paper.Point(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    paper.view.onFrame = function (event) {
      const time = event.time;
      const driftCenter = center.add(new paper.Point(
        Math.sin(time * 0.5) * 50,
        Math.cos(time * 0.4) * 50
      ));

      for (let i = 0; i < segments; i++) {
        const segment = path.segments[i];

        // Base organic breathing motion using sine waves
        const angle = (i / segments) * Math.PI * 2;
        const sine = Math.sin(time * 1.5 + i * 1.2);
        const offset = sine * 20; // Amplitude of breathing

        const basePoint = driftCenter.add(new paper.Point({
          angle: angle * 180 / Math.PI,
          length: radius + offset
        }));

        // Magnetic Push/Pull Physics based on cursor
        const vector = segment.point.subtract(mousePos);
        const distance = vector.length;

        // Magnetic radius
        const effectRadius = 250;

        if (distance < effectRadius) {
          // Push segments away from cursor smoothly
          const force = (effectRadius - distance) / effectRadius;
          const push = vector.normalize().multiply(force * 40);
          segment.point = segment.point.add(push.multiply(0.1));
        }

        // Spring physics: constantly pull segment back to its organic base point
        const springForce = basePoint.subtract(segment.point).multiply(0.04);
        segment.point = segment.point.add(springForce);
      }

      // Keep the path continuously smooth
      path.smooth({ type: 'continuous' });
    };

    // Handle Resize for Canvas Background
    paper.view.onResize = function (event) {
      path.position = paper.view.center;
      path.fillColor.destination = [paper.view.size.width, paper.view.size.height];
    };

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      paper.project.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="liquid-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
      data-paper-resize="true"
    />
  );
};

export default LiquidBackground;
