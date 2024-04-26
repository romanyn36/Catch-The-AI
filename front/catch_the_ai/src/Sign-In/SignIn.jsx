
import React, { Component } from "react";
import './SignIn.css';
import googleIcon from "./google.png";
import githubIcon from "./git.png";
import facebookIcon from "./face.png";

export class SignIn extends Component {
    handleGoogleLogin = () => {
        window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
    }

    handleFacebookLogin = () => {
        window.location.href = "https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email";
    }

    handleGitHubLogin = () => {
        window.location.href = "https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user";
    }
    
    render() {
        return (
            <div className="signin-container">
                <h2 className="UP">Hi, Welcome Back</h2>
                <div className="social-login">
                    <button className="google-login" onClick={this.handleGoogleLogin}> 
                        <img src={googleIcon} alt="Google Icon" /> Login with Google
                    </button>
                    <button className="github-login" onClick={this.handleGitHubLogin}>
                        <img src={githubIcon} alt="GitHub Icon" /> Login with GitHub
                    </button>
                    <button className="facebook-login" onClick={this.handleFacebookLogin}>
                        <img src={facebookIcon} alt="Facebook Icon" /> Login with Facebook
                    </button>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username/Email Address:</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username or email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="user-type">User Type:</label>
                        <select id="user-type" name="user-type">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select> */}
                    </div>
                    <div className="form-group">             
                  <label> <input type="checkbox" name="remember-me" /> Remember Me  </label>
                        <a href="/" className="frgt_pass">Forgot Password?</a>
                    </div>
        
                    <div className="form-group">
                        <button type="submit">Sign In</button>
                    </div>
                </form>
                <div className="form-group">
                    <p className="IN">Don't have an account? <a href="/Sign-Up">Sign Up</a></p>
                </div>
            </div>
        );
    }
}

export default SignIn;
