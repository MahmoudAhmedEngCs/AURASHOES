import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
