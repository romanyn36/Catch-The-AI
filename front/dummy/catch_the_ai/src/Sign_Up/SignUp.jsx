
import React, { Component } from "react";
import './SignUp.css';
import googleIcon from "./google.png";

export class SignUp extends Component {
  handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
  }


  render() {
    return (
      <div className="signup-container">
        <h2 className="UP">Sign Up</h2>
        <button className="google-login" onClick={this.handleGoogleLogin}>
          <img src={googleIcon} alt="Google Icon" /> SignUp with Google
        </button>
        <form className="ff">
          <div className="info">
            <div className="left">
              <div className="form-group">
                <label htmlFor="name">Name</label><br />
                <input type="text" id="name" name="name" placeholder="Enter your Name" />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label><br />
                <input type="text" id="country" name="country" placeholder="Enter your country" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label><br />
                <input type="password" id="password" name="password" placeholder="Enter your password" />
              </div>
            </div>
            <div className="right">
              <div className="form-group">
                <label htmlFor="email">Email</label><br />
                <input type="text" id="email" name="email" placeholder="Enter your Email" />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label><br />
                <input type="text" id="age" name="age" placeholder="Enter your Age" />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label><br />
                <input type="password" id="password2" name="password2" placeholder="Confirm Your Password" />
              </div>
            </div>
          </div>

          <div className="form-g">
            <label> <input type="checkbox" name="remember-me" /> Remember Me  </label>
          </div>

          <div className="form-g">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div className="form-group">
          <p className="IN">Do you have an account? <a href="/sign-in" className="INN">Sign In</a></p>
        </div>
      </div>
    );
  }
}

export default SignUp;
