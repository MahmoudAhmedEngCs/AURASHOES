import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  // Load cart data when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const { getUserData } = await import('../services/db');
        const data = await getUserData(user.uid);
        setCartItems(data.cartItems || []);
      } else {
        setCartItems([]);
      }
      setIsLoaded(true);
    };
    loadCart();
  }, [user]);

  const saveCart = useCallback(async (newCart) => {
    setCartItems(newCart);
    if (user) {
      const { updateUserCart } = await import('../services/db');
      await updateUserCart(user.uid, newCart);
    }
  }, [user]);

  const addToCart = useCallback((product, size) => {
    if (!user) {
      toast.error("You must be logged in to add items.");
      window.location.href = '/login';
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      let newCart;
      if (existing) {
        newCart = prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        newCart = [...prev, { ...product, size, quantity: 1 }];
      }
      
      // Save in background
      import('../services/db').then(({ updateUserCart }) => {
        if (user) updateUserCart(user.uid, newCart);
      });
      
      return newCart;
    });
    toast.success(`${product.title} added to cart!`);
  }, [user]);

  const removeFromCart = useCallback((productId, size) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => !(item.id === productId && item.size === size));
      import('../services/db').then(({ updateUserCart }) => {
        if (user) updateUserCart(user.uid, newCart);
      });
      return newCart;
    });
  }, [user]);

  const updateQuantity = useCallback((productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => {
      const newCart = prev.map(item => 
        item.id === productId && item.size === size 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      import('../services/db').then(({ updateUserCart }) => {
        if (user) updateUserCart(user.uid, newCart);
      });
      return newCart;
    });
  }, [user]);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    isLoaded
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
