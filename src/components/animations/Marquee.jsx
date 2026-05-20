import React from 'react';

const Marquee = ({ text, speed = 20 }) => {
  return (
    <div className="marquee-container" style={{ 
      overflow: 'hidden', 
      whiteSpace: 'nowrap', 
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '1rem 0',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(10px)',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)', // Break out of container
      position: 'relative',
      zIndex: 10
    }}>
      <div className="marquee-content" style={{ 
        display: 'inline-block',
        animation: `marquee ${speed}s linear infinite`,
        paddingLeft: '100%'
      }}>
        <span style={{ 
          fontSize: '4rem', 
          fontWeight: 800, 
          textTransform: 'uppercase', 
          fontFamily: 'Syne, sans-serif',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.5)',
          paddingRight: '2rem'
        }}>
          {text} • {text} • {text} • {text} •
        </span>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </div>
  );
};

export default Marquee;
