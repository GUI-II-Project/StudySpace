import React from "react";
import SignUpForm from "../components/SignUpForm";
import LoginNavBar from "../components/LoginNavBar";

function SignUpPage() {
  return (
    <div>
      <LoginNavBar />
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;
