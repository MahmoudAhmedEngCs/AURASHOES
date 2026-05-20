import React from 'react';
import GameCard from './GameCard';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section style={{
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 6rem',
      margin: '0 auto',
      width: '100%',
      maxWidth: '1536px',
      position: 'relative',
      height: 'calc(100vh - 120px)'
    }}>
      
      {/* Left Text Column */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 20, pointerEvents: 'auto' }}>
        
        <div className="overflow-hidden" style={{ marginBottom: '1.5rem' }}>
          <span className="gsap-reveal" style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Next-Gen Experience
          </span>
        </div>
        
        <h1 className="font-syne" style={{ fontWeight: 800, fontSize: '7.5rem', lineHeight: 0.9, letterSpacing: '-0.05em', marginBottom: '2rem', margin: 0 }}>
          <span className="reveal-mask"><span className="gsap-title block text-gradient-metal" style={{ display: 'block' }}>Liquid</span></span><br/>
          <span className="reveal-mask"><span className="gsap-title block" style={{ display: 'block' }}>Reality.</span></span>
        </h1>
        
        <div className="overflow-hidden" style={{ marginBottom: '3rem', maxWidth: '28rem' }}>
          <p className="gsap-reveal" style={{ fontSize: '1.125rem', lineHeight: 1.6, fontWeight: 500 }}>
            Redefining interactive entertainment through fluid motion, structural minimalism, and uncompromised aesthetic purity.
          </p>
        </div>

        {/* THE "ONLY PAPER" RECREATED BUTTON */}
        <div className="reveal-mask" style={{ paddingTop: '0.5rem' }}>
          <a href="#" className="gsap-reveal btn-chrome cursor-hover group" style={{ display: 'inline-flex' }}>
            <div className="btn-chrome-inner">
              <span>Explore Library</span>
              <ArrowRight size={20} />
            </div>
          </a>
        </div>
      </div>

      {/* Right Visual Column (Floating Images with 3D Parallax) */}
      <div style={{ width: '50%', position: 'relative', height: '100%', minHeight: '600px', pointerEvents: 'auto' }}>
        
        {/* Main floating game card */}
        <GameCard 
          imageSrc="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
          title="Cyber Flux"
          subtitle="Action RPG"
          speed={0.04}
          style={{
            right: '3rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '340px',
            height: '480px'
          }}
        />

        {/* Secondary offset game card */}
        <GameCard 
          imageSrc="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop"
          title="Neon Drift"
          subtitle="Racing Simulator"
          speed={-0.02}
          style={{
            right: '320px',
            top: '15%',
            width: '220px',
            height: '280px',
            padding: '0.375rem',
            borderRadius: '1.5rem'
          }}
        />
      </div>

      {/* Bottom UI Detail */}
      <div className="gsap-slide-up pointer-events-auto" style={{
        position: 'absolute',
        bottom: '2rem',
        left: '6rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>
        SCROLL TO EXPLORE ↓
      </div>
      
    </section>
  );
};

export default Hero;
