import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;

    const init = async () => {
      const { getAuthInstance } = await import('../services/firebase');
      if (cancelled) return;
      const { auth } = await getAuthInstance();
      if (cancelled) return;
      const { onAuthStateChanged } = await import('firebase/auth');
      if (cancelled) return;
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (cancelled) return;
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

    // Delay Firebase Auth loading by 3.5s so it never competes with FCP/LCP
    const delay = setTimeout(() => {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => init(), { timeout: 5000 });
      } else {
        init();
      }
    }, 3500);

    return () => {
      cancelled = true;
      clearTimeout(delay);
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      const { getAuthInstance } = await import('../services/firebase');
      const { auth, googleProvider } = await getAuthInstance();
      const { signInWithPopup } = await import('firebase/auth');
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { getAuthInstance } = await import('../services/firebase');
      const { auth } = await getAuthInstance();
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
      toast.success('Successfully logged out.');
    } catch (error) {
      console.error("Error signing out", error);
      toast.error('Error logging out.');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
