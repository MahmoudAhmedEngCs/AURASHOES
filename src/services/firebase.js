// Firebase app core is tiny (~15KB) - safe to load synchronously
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3BUvGeRPcEx7opicV2kTS7bbUdNrXBQ8",
  authDomain: "shoes-65880.firebaseapp.com",
  projectId: "shoes-65880",
  storageBucket: "shoes-65880.firebasestorage.app",
  messagingSenderId: "134221885878",
  appId: "1:134221885878:web:db3173bbc5decb82ea1117",
  measurementId: "G-J7FRYT3D8P"
};

// Initialize Firebase app only (no auth, no firestore yet)
const app = initializeApp(firebaseConfig);

// Lazy singletons - only loaded when first needed
let _auth = null;
let _googleProvider = null;
let _db = null;

export const getAuthInstance = async () => {
  if (!_auth) {
    const { getAuth, GoogleAuthProvider } = await import('firebase/auth');
    _auth = getAuth(app);
    _googleProvider = new GoogleAuthProvider();
  }
  return { auth: _auth, googleProvider: _googleProvider };
};

export const getDbInstance = async () => {
  if (!_db) {
    const { getFirestore } = await import('firebase/firestore');
    _db = getFirestore(app);
  }
  return _db;
};
