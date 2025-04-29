import React from "react";
import logo from "../imgs/logo.png";

class LandingNavBar extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div
            class="container-fluid"
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
          >
            <a class="navbar-brand" href="/" style={{ cursor: "pointer" }}>
              <img src={logo} alt="logo" width="30" height="30" />
            </a>
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#about" style={{ cursor: "pointer" }}>
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#features" style={{ cursor: "pointer" }}>
                  Features
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default LandingNavBar;
