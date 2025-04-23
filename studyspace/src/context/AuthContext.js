import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // added firebase auth imports

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // stores the signed in user
  const [loading, setLoading] = useState(true); // controls initial loading state

  useEffect(() => {
    const auth = getAuth(); // get auth instance
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);  // update user on login/logout
      setLoading(false);      // show UI after auth is confirmed
    });

    return () => unsubscribe(); // stop listener on unmount
  }, []);

  const login = (userInfo) => setUser(userInfo); // manually set user if needed

  const logout = () => {
    const auth = getAuth();
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
