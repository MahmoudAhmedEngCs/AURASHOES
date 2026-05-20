import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  // Load wishlist data when user logs in
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        const { getUserData } = await import('../services/db');
        const data = await getUserData(user.uid);
        setWishlistItems(data.wishlistItems || []);
      } else {
        setWishlistItems([]);
      }
      setIsLoaded(true);
    };
    loadWishlist();
  }, [user]);

  const toggleWishlist = useCallback((product) => {
    if (!user) {
      toast.error("You must be logged in to save favorites.");
      window.location.href = '/login';
      return;
    }

    setWishlistItems(prev => {
      const isExist = prev.find(item => item.id === product.id);
      let newWishlist;
      if (isExist) {
        toast.success("Removed from wishlist.");
        newWishlist = prev.filter(item => item.id !== product.id);
      } else {
        toast.success("Added to wishlist!");
        newWishlist = [...prev, product];
      }
      
      // Save in background
      import('../services/db').then(({ updateUserWishlist }) => {
        if (user) updateUserWishlist(user.uid, newWishlist);
      });
      
      return newWishlist;
    });
  }, [user]);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, wishlistCount, isLoaded }}>
      {children}
    </WishlistContext.Provider>
  );
};
