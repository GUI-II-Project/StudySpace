import React from "react";
import LoginForm from "../components/LoginForm";
import LoginNavBar from "../components/LoginNavBar";

function LoginPage() {
  return (
    <div>
      <LoginNavBar />
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
