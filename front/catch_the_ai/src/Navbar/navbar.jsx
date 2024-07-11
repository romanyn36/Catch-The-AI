import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { BASE_DOMAIN_URL } from '../index';
import Logo from '../Footer/logoc1.png';


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
    // get token from local storage or session storage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

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
    sessionStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
    window.location.href = '/';
  };

  render() {
    const { isLoggedIn, username, imageurl } = this.state;
    const { darkMode, toggleDarkMode } = this.props;

    return (
      <nav className={`navbar navbar-expand-lg  fixed-top ${darkMode ? 'dark-mode' : ''}`} data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand  align-items-center" to="/">
            <img src={Logo} alt="Logo" className={`navbar-logos brandImage ${darkMode ? 'dark-mode' : ''}`} />
            {/* <span className={`navbar-title me-0 ${darkMode ? 'dark-mode' : ''}`}>Catch The AI</span> */}
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center align-items-center" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/?scrollTo=text-detector">Start</a>
              </li>
              <li className="nav-item">
                <a className="nav-link  " href="/?scrollTo=pricing">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/?scrollTo=AboutUs">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/?scrollTo=ContactUs">Contact Us</a>
              </li>
            </ul>
            <div className="ms-auto d-flex align-items-center">
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
                        <li><Link className="dropdown-item"  data-bs-toggle="modal" data-bs-target="#logoutmodel" >Logout</Link></li>
                      </ul>
                    </li>
                  </ul>
                  <a href={`/UserProfile/${username}`} className="nav-link">
                    <img src={imageurl} alt="" className={`profileImg ${darkMode ? 'dark-mode' : ''}`} />
                  </a>
                </>
              )}
              {/* Dark mode switch */}
              {/* <div className="form-check form-switch ms-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="darkModeSwitch"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <label className={`form-check-label ${darkMode ? 'text-light' : ''}`} htmlFor="darkModeSwitch">
                  {darkMode ? 'Dark Mode' : 'Light'}
                </label>
              </div> */}
            </div>
          </div>
        </div>

        {/* logout model */}
        <div className="modal fade " id="logoutmodel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5  text-light" id="exampleModalLabel">Logout</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-light">
                Are you sure you want to logout?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
