import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import NavbarLoggedIn from '../nav2/Navbar.jsx';

export class Navbar extends Component {
  nav=1;
  render() {
    if (this.nav === 1) {
      return <NavbarLoggedOut />;
    }
    else {
    return (
      <NavbarLoggedIn></NavbarLoggedIn>
    
    );
  }}
}

function NavbarLoggedOut() {
  return (
    <>
       <nav className="navbar navbar-expand-lg fixed.-top" >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="navbar-title">Catch The AI</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
              </li>
 
              <li className="nav-item">
                <Link className="nav-link" to="/text-detector">Start</Link>
              </li>
        
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AboutUs">About Us</Link>
              </li>
            </ul>
            <div className="d-flex">
              <Link className="btn btn-outline-light me-3 rounded-pill" to="/sign-up">Sign Up</Link>
              <Link className="btn btn-outline-light me-3 rounded-pill" style={{ backgroundColor: "#c34da9" ,color:'white'}} to="/sign-in">Sign In</Link>

            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar;
