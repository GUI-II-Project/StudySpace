import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configuration.jsx"; // firebase config and auth export

function SignUpForm() {
  const [email, setEmail] = useState(""); // user email input
  const [password, setPassword] = useState(""); // password input
  const [confirmPassword, setConfirmPassword] = useState(""); // confirmation input
  const [error, setError] = useState(""); // error message
  const navigate = useNavigate();

  // handles form submission and Firebase signup
  async function handleSignUp(e) {
    e.preventDefault();

    // simple form validation
    if (!email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      // register the user using Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // redirect to login after successful signup
    } catch (err) {
      console.error("Signup error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("That email is already in use.");
      } else {
        setError("Failed to create account.");
      }
    }
  }

  return (
    <form
      className="w-100"
      style={{ maxWidth: "400px" }}
      onSubmit={handleSignUp}
    >
      <h2 className="text-white text-center mb-4">Create Account</h2>

      {/* show error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

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
