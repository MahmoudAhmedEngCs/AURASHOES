import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthInstance } from '../services/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const init = async () => {
      const { auth } = await getAuthInstance();
      const { onAuthStateChanged } = await import('firebase/auth');
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            name: currentUser.displayName || currentUser.email.split('@')[0],
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    };

    init();
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const { auth, googleProvider } = await getAuthInstance();
      const { signInWithPopup } = await import('firebase/auth');
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { auth } = await getAuthInstance();
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
      toast.success('Successfully logged out.');
    } catch (error) {
      console.error("Error signing out", error);
      toast.error('Error logging out.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
