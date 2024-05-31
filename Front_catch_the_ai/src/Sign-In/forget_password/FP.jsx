import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import style from "./FP.module.css";

class FP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = this.state;

        // Send a request to the backend to send a verification code to the email
        try {
            const response = await fetch('/send-reset-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                // If the code was sent successfully, redirect to the verification page
                this.props.history.push('/verification'); // Assuming '/verification' is the route for the verification page
            } else {
                // Handle error response from the server
                console.error('Failed to send reset code');
            }
        } catch (error) {
            console.error('Error sending reset code:', error);
        }
    }

    render() {
        return (
            <div className={style.fpContainer}>

                <h2 className={style.h2}>Forgot your password?</h2>
                <p className={style.p} >No worries! Enter your email below and we’ll send you a link to reset your password.</p>
                <form className={style.form } onSubmit={this.handleSubmit}>
                    <div className={style.formGroup}>
                        <label className={style.label} htmlFor="email">Email</label>
                        <input className={style.input}
                            type="email"
                            id="email"
                            placeholder="user@example.com"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <Link to="/VP" className={style.btn1}
                    >Send Code to Reset</Link>
                </form>
                <a href="/sign-in" className="backToSignin">Back to Sign-in</a>
            </div>
        );
    }
}

export default FP;
