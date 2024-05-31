import React, { Component } from "react";
import style from "./VP.module.css";

export class VP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ['', '', '', ''] // Initialize an array to hold each digit of the code
        };
    }

    handleChange = (index, e) => {
        const { value } = e.target;
        this.setState(prevState => {
            const code = [...prevState.code];
            code[index] = value; // Update the code array with the new value at the specified index
            return { code };
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Implement logic to handle verification code submission
        const verificationCode = this.state.code.join(''); // Join the code array into a single string
        console.log("Verification code submitted:", verificationCode);
    }

    render() {
        return (
            <div className={style.verificationContainer}>
                <h2 className={style.t1}>Verification</h2>
                <p className={style.p1}>A verification code has been sent to your email. Please enter the code below:</p>
                <form onSubmit={this.handleSubmit}>
                    <div className={style.verificationCode}>
                        {/* Map over each digit of the code and render a square input */}
                        {this.state.code.map((digit, index) => (
                            <input 
                            className={style.inputField}
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => this.handleChange(index, e)}
                                required
                            />
                        ))}
                    </div>
                    <button type="submit" className={style.btn6}>Verify</button>
                </form>
            </div>
        );
    }
}

export default VP;
