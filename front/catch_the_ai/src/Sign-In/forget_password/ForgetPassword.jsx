import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./ForgetPassword.module.css";
import { BASE_DOMAIN_URL } from "../../index";
import withNavigate from "../../utils/withNavigate";

const FP = ({ navigate }) => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchForgotPassword();
    }

    const fetchForgotPassword = async () => {
        const body = JSON.stringify({ email });
        const url = BASE_DOMAIN_URL + '/users/forgot_password/';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });
            if (response.ok) {
                const data = await response.json();
                if (data.status === 1) {
                    navigate('/VP', { state: { email } });
                } else {
                    alert(data.message);
                }
            } else {
                throw new Error('Request failed!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={style.fpContainer}>
            <h2 className={style.h2}>Forgot your password?</h2>
            <p className={style.p} >No worries! Enter your email below and we’ll send you a link to reset your password.</p>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <label className={style.label} htmlFor="email">Email</label>
                    <input className={style.input}
                        type="email"
                        id="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit' className={style.btn1} >
                    Send Code to Reset</button>
            </form>
            <Link to="/sign-in" className="backToSignin">Back to Sign-in</Link>
        </div>
    );
}

export default withNavigate(FP);
