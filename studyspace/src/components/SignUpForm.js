import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"; // firebase signup function
import { auth } from "../configuration.jsx"; // firebase config

function SignUpForm() {
  const [email, setEmail] = useState(""); // email input
  const [password, setPassword] = useState(""); // password input
  const [confirmPassword, setConfirmPassword] = useState(""); // confirm input
  const [error, setError] = useState(""); // error message
  const navigate = useNavigate();

  // handles redirect to login
  function handleLoginClick() {
    navigate("/login");
  }

  // handles signup form submission
  async function handleSignUp(e) {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password); // firebase signup
      navigate("/login"); // go to login after success
    } catch (err) {
      console.error("signup error:", err);
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
      <h2 className="text-white text-center mb-4">Create an Account</h2>

      {/* show firebase or form errors */}
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

      <button className="btn btn-dark w-100">Sign Up</button>

      <p className="text-center text-light" style={{ marginTop: "3rem" }}>
        Already have an account?{" "}
        <span
          className="fw-bold text-decoration-underline"
          style={{ cursor: "pointer" }}
          onClick={handleLoginClick}
        >
          Log in
        </span>
      </p>
    </form>
  );
}

export default SignUpForm;
