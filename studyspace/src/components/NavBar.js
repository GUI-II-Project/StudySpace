import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/home.css";
import logo from "../imgs/logo.png";

function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav
      className="navbar navbar-expand navbar-light d-flex align-items-center justify-content-start"
      style={{
        padding: "15px",
        height: "85px",
        backgroundColor: "#0D173290",
      }}
    >
      <Link className="navbar-brand" to="/home">
        <img src={logo} alt="logo" width="40px" height="40px" />
      </Link>
      <ul className="navbar-nav" style={{ width: "100%" }}>
        <li className="nav-item main-nav-item">
          <Link className="nav-link text-white" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item main-nav-item">
          <Link className="nav-link text-white" to="/notes">
            Notes
          </Link>
        </li>
        <li className="nav-item main-nav-item">
          <Link className="nav-link text-white" to="/calendar">
            Calendar
          </Link>
        </li>
        <li className="nav-item main-nav-item">
          <Link className="nav-link text-white" to="/tasks">
            Tasks
          </Link>
        </li>
      </ul>
      <button
        id="logout-button"
        className="btn btn-outline-light ms-auto"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
