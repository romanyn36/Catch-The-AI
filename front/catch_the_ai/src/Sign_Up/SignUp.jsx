import React, { Component } from "react";
import './SignUp.css';
import googleIcon from "./google.png";

export class SignUp extends Component {
  state = {
    name: "",
    email: "",
    country: "",
    age: "",
    password: "",
    password2: "",
    errors: {}
  };

  handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, country, age, password, password2 } = this.state;
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (!country) {
      errors.country = "Country is required";
    }

    if (!age) {
      errors.age = "Age is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (!password2) {
      errors.password2 = "Confirm Password is required";
    }

    this.setState({ errors });

    // If there are no errors, proceed with signup logic
    if (Object.keys(errors).length === 0) {
      // Implement signup logic here
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, country, age, password, password2, errors } = this.state;

    return (
      <div class="romani">
        <div className="signup-container">
          <h2 className="UP">Sign Up</h2>
          <button className="google-login" onClick={this.handleGoogleLogin}>
            <img src={googleIcon} alt="Google Icon" /> SignUp with Google
          </button>
          <form className="ff" onSubmit={this.handleSubmit}>
            <div className="info">
              <div className="left">
                <div className="signup_form_group">
                  <label htmlFor="name">Name</label><br />
                  <input type="text" id="name" name="name" value={name} placeholder="Enter your Name" onChange={this.handleChange} />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="signup_form_group">
                  <label htmlFor="country">Country</label><br />
                  <input type="text" id="country" name="country" value={country} placeholder="Enter your country" onChange={this.handleChange} />
                  {errors.country && <span className="error">{errors.country}</span>}
                </div>
                <div className="signup_form_group">
                  <label htmlFor="password">Password</label><br />
                  <input type="password" id="password" name="password" value={password} placeholder="Enter your password" onChange={this.handleChange} />
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>
              </div>
              <div className="right">
                <div className="signup_form_group">
                  <label htmlFor="email">Email</label><br />
                  <input type="text" id="email" name="email" value={email} placeholder="Enter your Email" onChange={this.handleChange} />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="signup_form_group">
                  <label htmlFor="age">Age</label><br />
                  <input type="text" id="age" name="age" value={age} placeholder="Enter your Age" onChange={this.handleChange} />
                  {errors.age && <span className="error">{errors.age}</span>}
                </div>
                <div className="signup_form_group">
                  <label htmlFor="password2">Confirm Password</label><br />
                  <input type="password" id="password2" name="password2" value={password2} placeholder="Confirm Your Password" onChange={this.handleChange} />
                  {errors.password2 && <span className="error">{errors.password2}</span>}
                </div>
              </div>
            </div>

            <div className="formsubmit">
              <label> <input type="checkbox" name="remember-me" /> Remember Me  </label>
            </div>

            <div className="formsubmit">
              <button type="submit">Sign Up</button>
            </div>
          </form>
          <div className="">
            <p className="IN">Do you have an account? <a href="/sign-in" className="INN">Sign In</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;