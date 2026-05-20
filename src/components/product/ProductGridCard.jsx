import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

const ProductGridCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  return (
    <Link to={`/sneaker/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="cursor-hover">
      <div 
        className="glass-card group" 
        style={{
          borderRadius: '1.5rem',
          overflow: 'hidden',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(0,0,0,0.1)';
        }}
      >
        <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '1.25rem', overflow: 'hidden', background: 'var(--metal-200)', position: 'relative' }}>
          <img 
            src={product.image} 
            alt={product.title}
            className="img-metallic"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Subtle overlay on hover */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', opacity: 0, transition: 'opacity 0.3s' }} className="group-hover:opacity-100" />
          
          {/* Wishlist Button */}
          <button 
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating to product details
              toggleWishlist(product);
            }}
            className="cursor-hover"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isLiked ? '#ff3b30' : 'var(--metal-800)',
              zIndex: 10,
              transition: 'all 0.2s ease'
            }}
          >
            <Heart size={18} fill={isLiked ? '#ff3b30' : 'none'} />
          </button>
        </div>
        
        <div style={{ padding: '1.5rem 1rem 1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h3 className="font-syne" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{product.title}</h3>
            <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>${product.price}</span>
          </div>
          <p style={{ fontSize: '0.875rem', opacity: 0.6, margin: 0, marginBottom: '1.5rem' }}>{product.category}</p>
          
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {product.colors.map(color => (
                <div key={color} style={{ width: '12px', height: '12px', borderRadius: '50%', background: color, border: '1px solid rgba(0,0,0,0.1)' }} />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
              View Details <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductGridCard;
