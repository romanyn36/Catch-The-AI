import React, { Component } from "react";
import { useEffect, useState } from "react";
import useFetchData from "../utils/useFetchData";
import { useFetch } from "use-http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faHome, } from "@fortawesome/free-solid-svg-icons";
// import signupImage from "./signup.jpg";
import signupImage from "./sign-up2.jpeg";
import "./SignUp.css";
import{BASE_DOMAIN_URL} from '../index';



function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    username: "",
    country: "",
    age: "",
    password: "",
    password2: "",
    rememberMe: false,
    errors: {},
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, username, country, age, password, password2 } = userInfo;
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!email.includes("@") || !email.endsWith(".com")) {
      errors.email = "This email is not valid ";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    if (!age) {
      errors.age = "Age is required";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be at least 4 characters long";
    } else if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(password)) {
      errors.password =
        "Password must include numbers, characters, and symbols";
    }
    if (!password2) {
      errors.password2 = "Confirm Password is required";
    }
    if (password !== password2) {
      errors.password2 = "Passwords do not match";
    }
    if (!username) {
      errors.username = "Username is required";
    }
    // make sure the username have no special characters
    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
      errors.username = "Username must contain only letters, numbers and underscores";
    }

    if (Object.keys(errors).length > 0) {
      setUserInfo({ ...userInfo, errors });
    } else {
      register();
      console.log("Form submitted successfully");

    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUserInfo({ ...userInfo, [name]: newValue });
  };

  const getPasswordStrength = () => {
    const { password } = userInfo;
    if (password.length >= 8) {
      return "Excellent";
    } else if (password.length >= 6) {
      return "Good";
    } else if (password.length >= 4) {
      return "Weak";
    } else {
      return "";
    }
  };

  const getPasswordStrengthClass = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case "Excellent":
        return "text-success";
      case "Good":
        return "text-primary";
      case "Weak":
        return "text-danger";
      default:
        return "";
    }
  };


  const { name, email, username, country, age, password, password2, rememberMe, errors, } = userInfo;

  const { post, response, error } = useFetch(BASE_DOMAIN_URL+'/register/');
  const register = async () => {
    const registerInfo = { name, email, username, country, age, password };
    // const options = ['POST', registerInfo];
    // const response = useFetchData(BASE_DOMAIN_URL+'/register/', options);
    const respnse = await post(registerInfo);
    if (response.ok) {
      console.log(response.data);
      // window.location.href = "/sign-in";
      var token = response.data.token;
      localStorage.setItem('token', token);

      console.log("Form submitted successfully ", response);
      // redirect to the home page
      window.location.href = "/";

    } else {
      console.error('There was a problem with your fetch operation:', error);
    }
  }




  const ageOptions = [];
  for (let i = 16; i <= 80; i++) {
    ageOptions.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12 d-flex flex-wrap bg-white rounded shadow">
            <div className="col-lg-6 d-flex align-items-center justify-content-center p-0">
              <img src={signupImage} alt="Signup" className="img-fluid" />
            </div>
            <div className="col-lg-6 p-4">
              <form onSubmit={handleSubmit}>
                <h2 className="text-center display-6 custom-font mb-4">Sign Up</h2>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="custom-label">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your Name"
                    onChange={handleChange}
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="custom-label">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="username" className="custom-label">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="username"
                    name="username"
                    value={username}
                    placeholder="Enter your username"
                    onChange={handleChange}
                  />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="custom-label">
                    <FontAwesomeIcon icon={faLock} className="me-2" />
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control custom-input"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                  <div className={`mt-1 ${getPasswordStrengthClass()}`}>
                    {getPasswordStrength()}
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password2" className="custom-label">
                    <FontAwesomeIcon icon={faLock} className="me-2" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control custom-input"
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm Your Password"
                    onChange={handleChange}
                  />
                  {errors.password2 && <div className="text-danger">{errors.password2}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="country" className="custom-label">
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="country"
                    name="country"
                    value={country}
                    placeholder="Enter your country"
                    onChange={handleChange}
                  />
                  {errors.country && <div className="text-danger">{errors.country}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="age" className="custom-label">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Age
                  </label>
                  <select
                    className="form-select custom-input"
                    id="age"
                    name="age"
                    value={age}
                    onChange={handleChange}
                  >
                    <option value="">Select Age</option>
                    {ageOptions}
                  </select>
                  {errors.age && <div className="text-danger">{errors.age}</div>}
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <div className="form-group mb-3 text-center">
                  <button type="submit" className="btn btn-purple w-50">Sign Up</button>
                </div>
                <p className="text-center">
                  Do you have an account?{" "}
                  <a href="/sign-in" className="text-danger font-weight-bold">
                    Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

