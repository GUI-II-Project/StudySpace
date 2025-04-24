import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../configuration.jsx"; // firebase auth instance
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // stores the signed in user
  const [loading, setLoading] = useState(true); // controls initial loading state

  // load user from firebase session on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // update user on login/logout
      setLoading(false); // stop showing loading state
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  // optional manual login setter (not commonly needed)
  const login = (userInfo) => setUser(userInfo);

  // firebase logout with fallback
  const logout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("firebase logout failed:", error));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
