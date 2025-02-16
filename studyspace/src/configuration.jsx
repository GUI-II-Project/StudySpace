// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);