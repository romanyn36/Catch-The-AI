import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faHome, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import style from "./SignUp.module.css";
import { BASE_DOMAIN_URL } from '../index';

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    username: "",
    country: "",
    age: "",
    gender: "",
    password: "",
    password2: "",
    rememberMe: false,
    errors: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, username, country, age, gender, password, password2 } = userInfo;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!email.includes("@") || !email.endsWith(".com")) errors.email = "Invalid email format";
    if (!country) errors.country = "Country is required";
    if (!age) errors.age = "Age is required";
    if (!gender) errors.gender = "Gender is required";
    if (!password) errors.password = "Password is required";
    else if (password.length < 4) errors.password = "Password must be at least 4 characters long";
    else if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(password)) errors.password = "Password must include numbers, characters, and symbols";
    if (!password2) errors.password2 = "Confirm Password is required";
    if (password !== password2) errors.password2 = "Passwords do not match";
    if (!username) errors.username = "Username is required";
    if (!/^[a-zA-Z0-9_]*$/.test(username)) errors.username = "Username must contain only letters, numbers, and underscores";

    if (Object.keys(errors).length > 0) {
      setUserInfo({ ...userInfo, errors });
    } else {
      register();
      // console.log("Form submitted successfully");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUserInfo({ ...userInfo, [name]: newValue });
  };

  const getPasswordStrength = () => {
    const { password } = userInfo;
    if (password.length >= 8) return "Excellent";
    else if (password.length >= 6) return "Good";
    else if (password.length >= 4) return "Weak";
    else return "";
  };

  const getPasswordStrengthClass = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case "Excellent": return "text-success";
      case "Good": return "text-primary";
      case "Weak": return "text-danger";
      default: return "";
    }
  };

  const { name, email, username, country, age, gender, password, password2, rememberMe, errors } = userInfo;
  const url = BASE_DOMAIN_URL + '/users/register/';

  const register = async () => {
    const registerInfo = { name, email, username, country, age, gender, password };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerInfo)
    }).then(response => response.json())
      .then(data => {
        if (data.token) {
          appendAlert('Registration successful! Redirecting to sign in page...', 'success');
          // save token in local storage if rememberMe is checked
          if (rememberMe) localStorage.setItem('token', data.token);
          // save token in session storage if rememberMe is not checked
          else sessionStorage.setItem('token', data.token);
        

          window.location.href = '/sign-in';
        } else {
          appendAlert('Registration failed! Please try again.'+data.message, 'danger');
        }
      }).catch(error => {
        // console.error('There was an error!', error);
        appendAlert('Registration failed! Please try again.', 'danger');
      });
  };





  const ageOptions = [];
  for (let i = 16; i <= 80; i++) {
    ageOptions.push(<option key={i} value={i}>{i}</option>);
  }

  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }
  return (
    <div className={`container my-5 ${style.signUpContainer}`}>
      <div className="row justify-content-center">
        <div className={`col-lg-8 col-md-10 col-sm-12 ${style.frameContainer} ${style.shadow} ${style.rounded}`}>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <h2 className={`text-center display-6 ${style.title5} mb-4`}>Explore verified media origins: AI or human. Join us!
              </h2>
              <div className="row">
                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="name" className={style.customLabel}>
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Name
                  </label>
                  <input type="text" className={`form-control ${style.inputField}`} id="name" name="name" value={name} placeholder="Enter your Name" onChange={handleChange} />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="username" className={style.customLabel}>
                    <FontAwesomeIcon icon={faUser} className="me-2 " />
                    Username
                  </label>
                  <input type="text" className={`form-control ${style.inputField}`} id="username" name="username" value={username} placeholder="Enter your username" onChange={handleChange} />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="email" className={style.customLabel}>
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Email
                  </label>
                  <input type="email" className={`form-control ${style.inputField}`} id="email" name="email" value={email} placeholder="Enter your Email" onChange={handleChange} />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="country" className={style.customLabel}>
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    Country
                  </label>
                  <input type="text" className={`form-control ${style.inputField}`} id="country" name="country" value={country} placeholder="Enter your country" onChange={handleChange} />
                  {errors.country && <div className="text-danger">{errors.country}</div>}
                </div>

                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="password" className={style.customLabel}>
                    <FontAwesomeIcon icon={faLock} className="me-2" />
                    Password
                  </label>
                  <input type="password" className={`form-control ${style.inputField}`} id="password" name="password" value={password} placeholder="Enter your password" onChange={handleChange} />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                  <div className={`mt-1 ${getPasswordStrengthClass()}`}>{getPasswordStrength()}</div>
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="password2" className={style.customLabel}>
                    <FontAwesomeIcon icon={faLock} className="me-2" />
                    Confirm Password
                  </label>
                  <input type="password" className={`form-control ${style.inputField}`} id="password2" name="password2" value={password2} placeholder="Confirm Your Password" onChange={handleChange} />
                  {errors.password2 && <div className="text-danger">{errors.password2}</div>}
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="gender" className={style.customLabel}>
                    <FontAwesomeIcon icon={faVenusMars} className="me-2" />
                    Gender
                  </label>
                  <select className={`form-select ${style.inputField}`} id="gender" name="gender" value={gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && <div className="text-danger">{errors.gender}</div>}
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="age" className={style.customLabel}>
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Age
                  </label>
                  <select className={`form-select ${style.inputField}`} id="age" name="age" value={age} onChange={handleChange}>
                    <option value="">Select Age</option>
                    {ageOptions}
                  </select>
                  {errors.age && <div className="text-danger">{errors.age}</div>}
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={handleChange} />
                  <label htmlFor="rememberMe" className="form-check-label fs-5">
                    Remember Me
                  </label>

                </div>
              </div>
              <div className="form-group mb-3 text-center">
                <div id='liveAlertPlaceholder'>

                </div>
                <button type="submit" className={`btn w-100 ${style.btnPurple}`}>Sign Up</button>
              </div>
              <p className="text-center text-dark fs-5">
                Do you have an account? <a href="/sign-in" className=" font-weight-bold text-danger">Sign In</a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
