import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import LogoIcon from "./logoc1.png";
// import LogoIcon from "./logo2.png";
import './Footer.css';

export class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <div className="container">
          <div className="row">
            {/* Column 1: Logo and Title */}
            <div className="col">
              <div className="logo-title">
                <img src={LogoIcon} alt="Logo" className="logo" />
                
              </div>
            </div>

            {/* Column 2: Description */}
            <div className="col">
              <blockquote className="f_text">
                <p>
                  Specializing in the detection of <br />
                  real and AI-generated content. <br />
                  Ensure the authenticity of your work. <br />
                  Try our premium services today!
                </p>
              </blockquote>
            </div>

            {/* Column 3: Legal */}
            <div className="col">
              <h3>Legal</h3>
              <div className="links">
                <Link to="/FAQs">FAQs</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-of-service">Terms of Service</Link>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="col text-white p-3">
  <h3>Contact</h3>
  <div className="contact-details">
    <Link to="/ContactUs" className="text-white"><FaEnvelope /> Contact Us</Link>
  </div>
  <div className="contact-details">
    <i className="fa fa-location"></i>
    <p>BFCAI <br /> Egypt</p>
  </div>
  <div className="contact-details">
    <i className="fa fa-phone"></i>
    <p>+010111100</p>
  </div>
</div>


            {/* Column 5: Social Media */}
            <div className="col">
              <h3>Social Media</h3>
              <a href="https://web.facebook.com"><FaFacebook className="social-icon" /></a>
              <a href="https://www.instagram.com"><FaInstagram className="social-icon" /></a>
              <a href="https://www.twitter.com"><FaTwitter className="social-icon" /></a>
              <a href="https://www.linkedin.com"><FaLinkedin className="social-icon" /></a>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="copy-right">
          <p>&copy; 2024 Catch the AI. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}
