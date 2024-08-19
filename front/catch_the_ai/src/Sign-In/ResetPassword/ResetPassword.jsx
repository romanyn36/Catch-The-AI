import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_DOMAIN_URL } from "../../index";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem('token');
    if (token === null) {
        navigate('/sign-in');
    }

    useEffect(() => {
        const email_ = location.state.email;
        setEmail(email_);
    }, [location.state.email]);

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            fetchResetPassword(password);
        } else {
            console.log("Passwords do not match");
        }
    }

    const fetchResetPassword = async (new_password) => {
        const body = JSON.stringify({ new_password, email });
        const url = BASE_DOMAIN_URL + '/users/reset_password/';
        console.log(body)
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: body
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed!');
            }
        }).then(data => {
            if (data.status === 1) {
                // remove token from local storage
                navigate('/SuccessfullyResetPassword');
                localStorage.removeItem('token');
            } else {
                console.log(data.message);
            }
        }).catch(error => {
            console.error("Error:", error);
        });
    }


    return (
        <div className="container mb-5" style={{ marginTop: "70px", padding: "20px", borderRadius: "10px", backgroundColor: "#e6d1d0", width: "50%" }}>
            <h2>Reset Password</h2>
            <p>Please enter your new password below:</p>
            <form onSubmit={handleSubmit} className="d-flex flex-column">
                <div className="form-group m-2">
                    <label htmlFor="password">New Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={handleChangePassword}
                        required
                    />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary m-2">
                    Update Password
                </button>
            </form>
            <Link to="/sign-in" className="d-block mt-3">Back to Sign-in</Link>
        </div>
    );

}

export default ResetPassword;
