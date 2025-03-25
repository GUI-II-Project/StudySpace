import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import logo from "../imgs/logo.png";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light d-flex align-items-center justify-content-start"
        style={{ padding: "15px", height: "85px", backgroundColor: "#0D173290" }}>
        <Link className="navbar-brand" to="/home">
          <img src={logo} alt="logo" width="40px" height="40px" />
        </Link>
        <ul className="navbar-nav" style={{ width: "100%" }}>
          <li className="nav-item main-nav-item">
            <Link className="nav-link text-white" to="/home">Home</Link>
          </li>
          <li className="nav-item main-nav-item">
            <Link className="nav-link text-white" to="/notes">Notes</Link>
          </li>
          <li className="nav-item main-nav-item">
            <Link className="nav-link text-white" to="/calendar">Calendar</Link>
          </li>
          <li className="nav-item main-nav-item">
            <Link className="nav-link text-white" to="/tasks">Tasks</Link>
          </li>
        </ul>
        <button id="logout-button"><Link to="/">Logout</Link></button>
      </nav>
    );
  }
}

export default NavBar;
