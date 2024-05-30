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
      imageurl: "images/prof.png"
      // "images/user.svg"
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
      const response = await fetch(BASE_DOMAIN_URL + '/get_user_info/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const img = `${BASE_DOMAIN_URL}/${data.image}`
        // console.log("image", img)
        this.setState({ userData: data, imageurl: img });

        // console.log('User data:', data);
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
    const { isLoggedIn,_,  imageurl} = this.state;

    return (
      <nav className="navbar navbar-expand-lg ">
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
              {!isLoggedIn ? (
                <>
                  <Link className="btn btn-outline-light me-3 rounded-pill" to="/sign-up">Sign Up</Link>
                  <Link className="btn btn-outline-light me-3 rounded-pill" style={{ backgroundColor: "#c34da9", color: 'white' }} to="/sign-in">Sign In</Link>
                </>
              ) : (
                <>
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" aria-current="page" href="/" onClick={this.handleLogout}>Logout</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-regular fa-bell"></i>
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </li>
                    <li className="nav-item d-flex">
                      <Link className="nav-link" to="/UserProfile">User</Link>
                      <a href="/UserProfile" ><img src={imageurl} alt="" className="profileImg" /></a>
                    </li>
                  </ul>
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
