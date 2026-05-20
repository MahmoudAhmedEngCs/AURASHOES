import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserData, updateUserCart } from '../services/db';
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
        const data = await getUserData(user.uid);
        setCartItems(data.cartItems || []);
      } else {
        setCartItems([]);
      }
      setIsLoaded(true);
    };
    loadCart();
  }, [user]);

  const saveCart = async (newCart) => {
    setCartItems(newCart);
    if (user) {
      await updateUserCart(user.uid, newCart);
    }
  };

  const addToCart = (product, size) => {
    if (!user) {
      toast.error("You must be logged in to add items.");
      window.location.href = '/login';
      return;
    }

    const existing = cartItems.find(item => item.id === product.id && item.size === size);
    let newCart;
    if (existing) {
      newCart = cartItems.map(item => 
        item.id === product.id && item.size === size 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      newCart = [...cartItems, { ...product, size, quantity: 1 }];
    }
    
    saveCart(newCart);
    toast.success(`${product.title} added to cart!`);
  };

  const removeFromCart = (productId, size) => {
    const newCart = cartItems.filter(item => !(item.id === productId && item.size === size));
    saveCart(newCart);
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = cartItems.map(item => 
      item.id === productId && item.size === size 
        ? { ...item, quantity: newQuantity } 
        : item
    );
    saveCart(newCart);
  };

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
