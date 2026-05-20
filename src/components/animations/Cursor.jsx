import React, { useEffect, useState } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if we are hovering over an element that should trigger the expanded cursor
      if (e.target.closest('a, button, .cursor-hover')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .cursor-hover')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovering ? '48px' : '12px',
        height: isHovering ? '48px' : '12px',
        backgroundColor: isHovering ? '#fff' : '#1a1c1e',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 100,
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
        mixBlendMode: isHovering ? 'exclusion' : 'difference',
      }}
    />
  );
};

export default Cursor;
