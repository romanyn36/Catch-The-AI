import React, { useEffect, useState } from "react";
import style from "./VP.module.css";
import { BASE_DOMAIN_URL } from "../../index";
import useFetch from "use-http";
import { useLocation } from "react-router-dom";
// import history
import { useNavigate } from "react-router-dom";




const VP = () => {
    const [reset_code, setResetCode] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        // Get the email from the location state
        const email = location.state.email;
        setEmail(email);
        console.log("Email:", email);
        // Do something with the email if needed
    }, [location.state.email]);


    const handleChange = (index, e) => {
        const { value } = e.target;
        setResetCode(prevCode => {
            const updatedCode = [...prevCode];
            updatedCode[index] = value;
            return updatedCode;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const verificationCode = reset_code.join('');
        fetchVerifyCode(verificationCode);
        console.log("Verification code submitted:", verificationCode);
    }

    const fetchVerifyCode = async (reset_code) => {
        const body = JSON.stringify({ email, reset_code });
        console.log("Body:", body);
        const url = BASE_DOMAIN_URL + '/users/reset_password_activate/';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(response => {
            if (response.ok) {
                console.log("Response:", response);
                return response.json();
            } else {
                throw new Error('Request failed!');
            }
        }).then(data => {
            console.log("Data:", data);
            if (data.status === 1) {
                console.log(data.message);
                // store the token in local storage
                localStorage.setItem('token', data.token);
                // Redirect to the new password page and pass the email as state
                navigate('/ResetPassword', { state: { email } });
                
            } else {
                console.log(data.message);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div className={style.verificationContainer}>
            <h2 className={style.t1}>Verification</h2>
            <p className={style.p1}>A verification code has been sent to your email. Please enter the code below:</p>
            <form onSubmit={handleSubmit}>
                <div className={style.verificationCode}>
                    {reset_code.map((digit, index) => (
                        <input
                            className={style.inputField}
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    ))}
                </div>
                <button type="submit" className={style.btn6}>Verify</button>
            </form>
        </div>
    );
}

export default VP;
