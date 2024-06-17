import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { BASE_DOMAIN_URL } from '../index';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null,
      imageurl: "images/prof.png",
      username: "username",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isLoggedIn: true });
      this.fetchUserData(token);
    }
  }

  fetchUserData = async (token) => {
    try {
      const response = await fetch(`${BASE_DOMAIN_URL}/users/get_user_info/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const img = `${BASE_DOMAIN_URL}/${data.image}`;
        this.setState({ userData: data, imageurl: img, username: data.username });
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn, username, imageurl } = this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-light" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="navbar-title">Catch The AI</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/?scrollTo=text-detector">Start</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/?scrollTo=pricing">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/?scrollTo=AboutUs">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/?scrollTo=ContactUs">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="ms-auto d-flex">
              {!isLoggedIn ? (
                <>
                  <Link className="btn btn-outline-light me-3 rounded-pill" to="/sign-up">Sign Up</Link>
                  <Link className="btn btn-outline-light me-3 rounded-pill" style={{ backgroundColor: "#c34da9", color: 'white' }} to="/sign-in">Sign In</Link>
                </>
              ) : (
                <>
                  <ul className="navbar-nav mb-2 mb-lg-0 me-3">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {username}
                      </a>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={`/UserProfile/${username}`}>Profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/UserHistory">History</Link></li>
                        <li><Link className="dropdown-item" onClick={this.handleLogout} to="/">Logout</Link></li>
                      </ul>
                    </li>
                  </ul>
                  <a href={`/UserProfile/${username}`} className="nav-link">
                    <img src={imageurl} alt="" className="profileImg" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
