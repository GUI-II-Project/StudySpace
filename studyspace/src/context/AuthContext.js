import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// Create a context to manage authentication state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // stores current logged-in user
  const [loading, setLoading] = useState(true); // loading state to prevent flicker

  useEffect(() => {
    // check if user is already logged in and keep session alive
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  // use this to manually set user if needed (e.g., after Google login)
  const login = (userInfo) => setUser(userInfo);

  // logout from both firebase and local state
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("Firebase logout failed:", error));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the authentication context
export function useAuth() {
  return useContext(AuthContext);
}
