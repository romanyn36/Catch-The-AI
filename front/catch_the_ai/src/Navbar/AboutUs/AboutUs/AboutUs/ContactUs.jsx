import React, { Component } from "react";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import './ContactUs.css';

export class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            showError: false
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = this.state;
        // Check if any field is empty
        if (!name || !email || !subject || !message) {
            this.setState({ showError: true });
            return;
        }
        // If all fields are filled, submit the form
        console.log('Form submitted:', this.state);
        // Reset the form and error state
        this.setState({
            name: '',
            email: '',
            subject: '',
            message: '',
            showError: false
        });
    };

    render() {
        const { name, email, subject, message, showError } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-container">
                            <div className="contact-info">
                                <h3 className="contact-title">Contact Information</h3>
                                <p><FaEnvelope /> Email: CatchTheAi@gmail.com</p>
                                <p><FaPhone /> Phone: 0114539888139</p>
                                <p><FaMapMarkerAlt /> Address: 123 Main St, Cairo, Egypt</p>
                            </div>
                            <div className="follow-us">
                                <h3>Follow Us</h3>
                                <div className="social-links">
                                    <a href="#">Facebook</a>
                                    <a href="#">GitHub</a>
                                    <a href="#">Google</a>
                                </div>
                            </div>
                            <div className="contact-form">
                                <h2>Contact Us</h2>
                                <label htmlFor="name">Your Name</label>
                                <input type="text" id="name" value={name} onChange={this.handleChange} placeholder="Your Name" />
                                <label htmlFor="email">Your Email</label>
                                <input type="email" id="email" value={email} onChange={this.handleChange} placeholder="Your Email" />
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" value={subject} onChange={this.handleChange} placeholder="Subject" />
                                <label htmlFor="message">Your Message</label>
                                <textarea id="message" value={message} onChange={this.handleChange} placeholder="Your Message"></textarea>
                                {showError && <p className="error-message">Please fill out all fields.</p>}
                                <button onClick={this.handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactUs;
