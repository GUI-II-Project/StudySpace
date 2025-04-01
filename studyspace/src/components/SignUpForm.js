import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
      return setError("Username already exists.");
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  }

  return (
    <form className="w-100" style={{ maxWidth: "400px" }} onSubmit={handleSignUp}>
      <h2 className="text-white text-center mb-4">Create Account</h2>

      {error && <div className="alert alert-danger">{error}</div>}

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
        className="form-control bg-dark bg-opacity-75 text-white border-light mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className="form-label fs-5 text-white">Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm Password"
        className="form-control bg-dark bg-opacity-75 text-white border-light mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="btn btn-primary w-100">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
