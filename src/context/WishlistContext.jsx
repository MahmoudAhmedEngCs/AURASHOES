import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserData, updateUserWishlist } from '../services/db';
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
        const data = await getUserData(user.uid);
        setWishlistItems(data.wishlistItems || []);
      } else {
        setWishlistItems([]);
      }
      setIsLoaded(true);
    };
    loadWishlist();
  }, [user]);

  const saveWishlist = async (newWishlist) => {
    setWishlistItems(newWishlist);
    if (user) {
      await updateUserWishlist(user.uid, newWishlist);
    }
  };

  const toggleWishlist = (product) => {
    if (!user) {
      toast.error("You must be logged in to save favorites.");
      window.location.href = '/login';
      return;
    }

    const isExist = wishlistItems.find(item => item.id === product.id);
    let newWishlist;
    if (isExist) {
      toast.success("Removed from wishlist.");
      newWishlist = wishlistItems.filter(item => item.id !== product.id);
    } else {
      toast.success("Added to wishlist!");
      newWishlist = [...wishlistItems, product];
    }
    
    saveWishlist(newWishlist);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, wishlistCount, isLoaded }}>
      {children}
    </WishlistContext.Provider>
  );
};
