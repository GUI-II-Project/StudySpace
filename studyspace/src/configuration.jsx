// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // added auth import for login and user session
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// export auth

const auth = getAuth(app); // initialized firebase auth service
//const analytics = getAnalytics(app);

// Export Firebase instances for use in the app
export { app, database, auth };
