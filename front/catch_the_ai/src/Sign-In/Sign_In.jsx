import React from "react";
import style from "./Sign_In.module.css";
import { Footer } from "../Footer/Footer";
import { useFetch } from 'use-http'; // Import the useFetch hook from use-http
import { BASE_DOMAIN_URL } from '../index';
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon

class Sign_In extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();

        const { username, password } = this.state;

        // Example URL for login API
        const loginUrl = `${BASE_DOMAIN_URL}/users/login/`;

        try {
            // Example POST request using fetch
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed.');
            }

            const data = await response.json();
            console.log('Login successful!', data);

            // Example handling of successful login (redirect, etc.)
            localStorage.setItem('token', data.token);
            window.location.href = "/"; // Redirect to home page
        } catch (error) {
            console.error('Error logging in:', error);

            // Example handling of incorrect password (change input field style)
            if (error.message === 'Login failed.') {
                document.getElementById('password').style.borderColor = 'red';
                document.getElementById('password').placeholder = 'Wrong Password';
            }
        }
    };

    handleGoogleLogin = () => {
        // Redirect to Google OAuth login page
        window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
    };

    render() {
        return (
            <>
                <div className={style.pageContainer}>
                    <div className={style.signinContainer}>
                        <div className={style.ff}>
                            <h2 className={style.title5}>Sign In</h2>
                            <p>Hi, Welcome back</p>
                            <button className={style.googleLogin} onClick={this.handleGoogleLogin}>
                                <i className="bi bi-google"></i> Login with Google
                            </button>
                            <p>or login with email</p>
                            <form onSubmit={this.handleFormSubmit}>
                                <div className={style.formGroup}>
                                    <label htmlFor="username" className="customLabel">
                                        <i className="bi bi-envelope-fill"></i> Email
                                    </label><br />
                                    <input 
                                        type="text" 
                                        id="username" 
                                        name="username" 
                                        value={this.state.username} 
                                        onChange={this.handleInputChange} 
                                        placeholder="Enter your Email" 
                                        className={`inputField ${style.inputWithIcon}`} // Apply inputField class
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label htmlFor="password" className="customLabel">
                                        <FontAwesomeIcon icon={faLock} className="me-2" /> Password
                                    </label><br />
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        value={this.state.password} 
                                        onChange={this.handleInputChange} 
                                        placeholder="Enter your password" 
                                        className={`inputField ${style.inputWithIcon}`} // Apply inputField class
                                    />
                                </div>
                                <div className={style.formG}>
                                    <label>
                                        <input type="checkbox" className="remember-me" /> Remember Me
                                    </label>
                                    <a href="/FP" className="forgot-password-link">Forgot Password?</a>
                                </div>
                                <button type="submit" className={`${style.googleLogin} loginbtn`}>Login</button>
                            </form>
                            <div className="">
                                <p className={style.IN}>Not Registered Yet? <a href="/sign-up" className={style.INN}>Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Sign_In;
