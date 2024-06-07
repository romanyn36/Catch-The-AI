import React from 'react';
import { Link } from 'react-router-dom';
function SuccessfullyResetPassword() {
    return (
        <div className="container mb-5" style={{ marginTop: "70px", padding: "20px", borderRadius: "10px", backgroundColor: "#e6d1d0", width: "50%" }}>
            <h2>Password Reset Successfully</h2>
            <p>Your password has been successfully reset. You can now sign in with your new password.</p>
            <Link to="/sign-in" className="btn btn-primary">Sign In</Link>
        </div>
    );
}
export default SuccessfullyResetPassword;