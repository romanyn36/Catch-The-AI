import React from "react";
import style from "./Sign_In.module.css";
import { Footer } from "../Footer/Footer";
import { useFetch } from 'use-http'; // Import the useFetch hook from use-http
import { BASE_DOMAIN_URL } from '../index';
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon

class Sign_In extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: false // Add rememberMe state
        };
    }

    handleInputChange = (event) => {
        if (event.target.name === 'rememberMe') {
            this.setState(prevState => ({
                rememberMe: !prevState.rememberMe
            }));
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
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
        const { username, password, rememberMe } = this.state;

        return (
            <>
                <div className={style.pageContainer}>
                    <div className={style.signinContainer}>
                        <h2 className={style.title5}>Discover the magic of AI! Sign in to find out if your media was crafted by artificial intelligence.</h2>
              
                        <form onSubmit={this.handleFormSubmit} className={style.formContainer}>
                            <div className={style.formGroup}>
                                <label htmlFor="username" className={style.customLabel}>
                                    <FontAwesomeIcon icon={faEnvelope} className={style.icon} /> Email
                                </label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    value={username} 
                                    onChange={this.handleInputChange} 
                                    placeholder="Enter your Email" 
                                    className={`${style.inputField}`} 
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="password" className={style.customLabel}>
                                    <FontAwesomeIcon icon={faLock} className={style.icon} /> Password
                                </label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={password} 
                                    onChange={this.handleInputChange} 
                                    placeholder="Enter your password" 
                                    className={`${style.inputField}`} 
                                />
                            </div>
                            <div className={style.rememberMe}>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="rememberMe" 
                                        checked={rememberMe} 
                                        onChange={this.handleInputChange} 
                                        className={style.checkbox} 
                                    /> Remember Me
                                </label>
                            </div>
                            <div className={style.formG}>
                                <button type="submit" className={`${style.loginButton}`}>Login</button><br/>
                                <button className={style.googleLogin} onClick={this.handleGoogleLogin}>
                            <i className="bi bi-google"></i>
                            <span>Login with Google</span>
                        </button>

                            </div>
                        </form>
                        <div className={style.registerLink}>           
                          <a href="/FP" className={style.forgotPasswordLink}>Forgot Password?</a>

                            <p className={style.IN}>Not Registered Yet? <a href="/sign-up" className={style.INN}>Sign Up</a></p>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Sign_In;
