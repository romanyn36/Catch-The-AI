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
            rememberMe: false, // Add rememberMe state,
            
        };
    }

    handleInputChange = (event) => {
        if (event.target.name === 'rememberMe') {
            this.setState(prevState => ({
                rememberMe: !prevState.rememberMe
            }));
            console.log(this.state.rememberMe);
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const { username, password, rememberMe } = this.state;
        const url = BASE_DOMAIN_URL + '/users/login/';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(response => response.json())
            .then(data => {

                if (data.status === 1) {
                    // console.log('rememberMe:', rememberMe);
                    if (rememberMe) {
                        localStorage.setItem('token', data.token);
                    } else {
                        sessionStorage.setItem('token', data.token);
                    }
                    window.location.href = '/';
                }
                else {
                    this.addalert(data.message, 'danger');
                }
            }).catch(error => {
                console.error('There was an error!', error);
            }
            );
    };

    addalert = (message, type) => {
        // add alert for verfication email
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
        appendAlert(message, type);
    }
    handleGoogleLogin = () => {
        // Redirect to Google OAuth login page
        window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
    };

    render() {
        const { username, password, rememberMe, auth_error } = this.state;

        return (
            <>
                <div className={style.pageContainer}>
                    <div className={style.signinContainer}>
                        <h2 className={style.title5}>Discover the magic of AI! Sign in to find out if your media was crafted by artificial intelligence.</h2>

                        <form onSubmit={this.handleFormSubmit} className={style.formContainer}>
                            <div className={style.formGroup}>

                                <div id='liveAlertPlaceholder'>

                                </div>

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
                                <button type="submit" className={`${style.loginButton}`}>Login</button><br />
                                {/* <button className={style.googleLogin} onClick={this.handleGoogleLogin}>
                                    <i className="bi bi-google"></i>
                                    <span>Login with Google</span>
                                </button> */}

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
