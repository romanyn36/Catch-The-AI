
import React, { Component } from "react";
import './Sign_In.css';
import googleIcon from "./google.png";
import githubIcon from "./git.png";
import facebookIcon from "./face.png";
import { Footer } from "../Footer/Footer";

export class Sign_In extends Component {
    handleGoogleLogin = () => {
        window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
    }


    render() {
        return (
            <>
                <div className="page-container">
                    <div className="signin-container">
                        <h2 className="UP">Sign In</h2>
                        <p>Hi,Welcome back</p>
                        <button className="google-login" onClick={this.handleGoogleLogin}>
                            <img src={googleIcon} alt="logo" /> Login with Google
                        </button>
                        <p>or login with email</p>
                        <form className="ff">
                            <div className="form-group">
                                <label htmlFor="email">Email </label><br />
                                <input type="text" id="email" name="age" placeholder="Enter your Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label><br />
                                <input type="password" id="password2" name="password2" placeholder="Enter your password" />
                            </div>
                            <div className="form-g">
                                <label> <input type="checkbox" name="remember-me" /> Remember Me  </label>
                                <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>

                            </div>

                            <div className="form-g">
                                <button type="submit">login</button>
                            </div>
                        </form>
                        <div className="">
                            <p className="IN">Not Register Yet? <a href="/sign-up" className="INN">Sign Up</a></p>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </>

        );
    }
}

export default Sign_In;