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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Lazy-loaded auth and firestore to avoid blocking the critical path
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

// Synchronous getters for already-initialized instances (used after first load)
export { _auth as auth, _googleProvider as googleProvider, _db as db };

// Initialize eagerly in background so they're ready when needed
const _initPromise = Promise.all([getAuthInstance(), getDbInstance()]);
export const firebaseReady = _initPromise;
