import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Load environment variables from `.env`
/**
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
**/

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVNUZbCqoIgHJIf6V420ugz_wKaQiPwl8",
  authDomain: "gui-ii-studyspace.firebaseapp.com",
  databaseURL: "https://gui-ii-studyspace-default-rtdb.firebaseio.com",
  projectId: "gui-ii-studyspace",
  storageBucket: "gui-ii-studyspace.firebasestorage.app",
  messagingSenderId: "42061456172",
  appId: "1:42061456172:web:a560e69f8e9edd97370289",
  measurementId: "G-3JLQCVFHBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage, signInWithPopup, signOut };
