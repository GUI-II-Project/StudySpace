// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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
const database = getDatabase(app);
const auth = getAuth(app); // this is needed for login persistence

export { app, database, auth };
