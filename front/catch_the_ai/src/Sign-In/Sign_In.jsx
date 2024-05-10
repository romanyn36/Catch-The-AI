import React, { useState } from "react";
import './Sign_In.css';
import img1 from "./img1.jpg"; // Import the image
import { Footer } from "../Footer/Footer";
import { useFetch } from 'use-http'; // Import the useFetch hook from use-http

// Functional component for the form
const MyForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '' }
    );
    // // handle empty form submission
    // if (formData.username === '' ) {
    
    // }
    // if (formData.password === '' ) {
    // }

    
// 


    // Use the useFetch hook to handle API requests
    const { post, response, error } = useFetch('http://127.0.0.1:8000/login/');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        // Use the post function from useFetch to send a POST request
        const responseData = await post(formData);

        if (response.ok) {
            console.log(responseData); // Assuming the response is JSON data
            // Redirect to another page
            var message = responseData.message;
            if (message === "successfully login") {
                // window.location.href = "/";
                localStorage.setItem('token', response.data.token);

            }
            if (message === "wrong password") {
                // change the color of the password field to red
                document.getElementById("password").style.borderColor = "red";
                // set label message to wrong password
                document.getElementById("password").placeholder = "Wrong Password";
            }

        } else {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Email</label><br />

                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your Email" />
                {/* {emailError && <span style={{ color: 'red', fontFamily: 'cursive' }}>{emailError}</span>} */}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label><br />
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
            </div>
            <div className="form-g">
                <label><input type="checkbox" name="remember-me" /> Remember Me</label>
                <a href="/FP" className="forgot-password-link">Forgot Password?</a>
            </div>
            <div className="form-g">
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

class Sign_In extends React.Component {
    /////////////////  
    handleGoogleLogin = () => {
        // Redirect to Google OAuth login page
        window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
    }

    render() {
        return (
            <>
                <div className="page-container">
                    <div className="signin-container">
                        <div className="ff">
                            <h2 className="title5">Sign In</h2>
                            <p>Hi, Welcome back</p>
                            <button className="google-login" onClick={this.handleGoogleLogin}>
                                Login with Google
                            </button>
                            <p>or login with email</p>
                            <MyForm /> {/* Render the form component */}
                            <div className="">
                                <p className="IN">Not Registered Yet? <a href="/sign-up" className="INN">Sign Up</a></p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img className="img1" src={img1} alt="Sign in" />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Sign_In;











