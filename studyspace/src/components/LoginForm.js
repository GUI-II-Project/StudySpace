import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleManualLogin(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!username || !password) {
      return setError("Please enter both fields.");
    }

    if (!users[username] || users[username] !== password) {
      return setError("Invalid username or password.");
    }

    login({ username });
    navigate("/home");
  }

  function handleGoogleSuccess(credentialResponse) {
    const decoded = jwtDecode(credentialResponse.credential);
    login(decoded);
    navigate("/home");
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
      <label className="form-label fs-5 text-white">Username</label>
      <input
        type="text"
        placeholder="Username"
        className="form-control bg-dark bg-opacity-75 text-white border-light mb-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
