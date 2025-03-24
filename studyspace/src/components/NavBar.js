import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

class NavBar extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "#0D1732" }}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div
            className="container-fluid"
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
          >
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="logo" width="30" height="30" />
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/calendar">
                  Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/tasks">
                  Tasks
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
