import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import LogoIcon from "./IMG-20240309-WA0012.jpg"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible
    }));
  };

  render() {
    const { menuVisible } = this.state;

    return (
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="Home">
             <img src={LogoIcon} alt="Logo" className="navbar-logo" />
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <ul className="me-auto mb-2 mb-lg-0 d-flex">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/image-detector">Image Detector</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/text-detector">Text Detector</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/audio-detector">Audio Detector</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">Pricing</Link>
              </li>
               <li className="nav-item">
                <a className="nav-link" href="#Help">Help</a>
              </li>
               <li className="nav-item">
                <a className="nav-link" href="#Footer">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="navbar-right-items">
            <div className={`dropdown ${menuVisible ? 'show' : ''}`}>
              <button className="btn btn-outline-light dropdown-toggle" onClick={this.toggleMenu} style={{ border: 'none', backgroundColor: 'transparent' }}>
                <FontAwesomeIcon icon={faUser} />
              </button>
              <div className={`dropdown-menu ${menuVisible ? 'show' : ''}`}>
                <Link className="dropdown-item" to="/sign-up">Sign Up</Link>
                <Link className="dropdown-item" to="/sign-in">Sign In</Link>
                <Link className="dropdown-item" to="/admin">Admin</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
