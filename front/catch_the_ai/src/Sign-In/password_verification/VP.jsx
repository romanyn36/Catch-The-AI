import React, { useEffect, useState, useRef } from "react";
import style from "./VP.module.css";
import { BASE_DOMAIN_URL } from "../../index";
import useFetch from "use-http";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VP = () => {
    const [reset_code, setResetCode] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const inputRefs = useRef([]);

    useEffect(() => {
        // Get the email from the location state
        const email = location.state?.email;
        setEmail(email);
    }, [location.state]);

    const handleChange = (index, e) => {
        let { value } = e.target;
        // Ensure only digits are entered
        value = value.replace(/\D/g, '');
        setResetCode(prevCode => {
            const updatedCode = [...prevCode];
            updatedCode[index] = value;
            return updatedCode;
        });

        // Move focus to the next input field
        if (value && index < reset_code.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').trim();
        const pasteDigits = pasteData.replace(/\D/g, '').split('').slice(0, reset_code.length);

        setResetCode(prevCode => {
            const updatedCode = [...prevCode];
            pasteDigits.forEach((digit, idx) => {
                updatedCode[idx] = digit;
            });
            return updatedCode;
        });

        // Move focus to the next input field if not all digits are filled
        const nextIndex = pasteDigits.length;
        if (nextIndex < reset_code.length) {
            inputRefs.current[nextIndex].focus();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const verificationCode = reset_code.join('');
        fetchVerifyCode(verificationCode);
    }

    const fetchVerifyCode = async (reset_code) => {
        const body = JSON.stringify({ email, reset_code });
        const url = BASE_DOMAIN_URL + '/users/reset_password_activate/';
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
                    localStorage.setItem('token', data.token);
                    navigate('/ResetPassword', { state: { email } });
                } else {
                    console.log(data.message);
                }
            } else {
                throw new Error('Request failed!');
            }
        } catch (error) {
            console.log(error);
        }
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
                            onPaste={handlePaste}
                            ref={el => inputRefs.current[index] = el}
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
