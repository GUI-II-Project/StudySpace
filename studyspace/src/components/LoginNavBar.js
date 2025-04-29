import React from "react";
import logo from "../imgs/logo.png";

class LoginNavBar extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light">
          <div
            class="container-fluid"
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
          >
            <a class="navbar-brand" href="/" style={{ cursor: "pointer" }}>
              <img src={logo} alt="logo" width="30" height="30" />
            </a>
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/" style={{ color: "white", cursor: "pointer" }}>
                  Return Home
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default LoginNavBar;
