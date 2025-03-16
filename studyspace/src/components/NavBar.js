import React from 'react'
import logo from '../imgs/logo.png'

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid" style={{ marginLeft: '1rem', marginRight: '1rem' }}>
            <a className="navbar-brand" href="#">
              <img src={logo} alt="logo" width="30" height="30" />
            </a>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar
