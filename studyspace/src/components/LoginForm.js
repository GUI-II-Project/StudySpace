import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword, getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../configuration.jsx"; // must export auth

function LoginForm() {
  const [email, setEmail] = useState(""); // changed from username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleManualLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      return setError("Please enter both fields.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      login(userCredential.user); // store user in context
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    try {
      const credential = GoogleAuthProvider.credential(credentialResponse.credential);
      const authInstance = getAuth();
      const result = await signInWithCredential(authInstance, credential);
      login(result.user); // this includes uid
      navigate("/home");
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Try again.");
    }
  }

  function handleGoogleError() {
    console.log("Google login failed");
  }

  function handleCreateAccountClick() {
    navigate("/signup");
  }

  return (
    <form
      className="w-100"
      style={{ maxWidth: "400px" }}
      onSubmit={handleManualLogin}
    >
      <label className="form-label fs-5 text-white">Email</label>
      <input
        type="email"
        placeholder="Email"
        className="form-control bg-dark bg-opacity-75 text-white border-light mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="form-label fs-5 text-white">Password</label>
      <input
        type="password"
        placeholder="Password"
        className="form-control bg-dark bg-opacity-75 text-white border-light mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-dark w-100 mb-4">
        Login
      </button>

      <div className="d-flex justify-content-center mb-4">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>

      <p className="text-center text-light">
        New here?{" "}
        <span
          className="fw-bold text-decoration-underline"
          style={{ cursor: "pointer" }}
          onClick={handleCreateAccountClick}
        >
          Create an account
        </span>
      </p>
    </form>
  );
}

export default LoginForm;
