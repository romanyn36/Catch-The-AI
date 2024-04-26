import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Make sure you have Footer.css file for styling
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons from Font Awesome
import LogoIcon from "./IMG-20240309-WA0012.jpg"; 

export class Footer extends Component {
  render() {
    return (
      <footer className="Footer" id="Footer">
        <div className="container">
          <div className="row">
            <div className="col" id="company">
            <div className='describe'>
            <img src={LogoIcon}alt="Logo" className="logo" />
              <p className='f_text'>
                We are specialized in detecting <br />
                 " Real and AI Generated content " <br />
                 Check your work ! <br />
                Try our premium services^.^
              </p>
            </div>
              <div className="social">
                {/* Facebook icon */}
                <a href="https://web.facebook.com"><FaFacebook className="social-icon" /></a>
                {/* Instagram icon */}
                <a href="https://www.instagram.com"><FaInstagram className="social-icon" /></a>
                {/* Twitter icon */}
                <a href="https://www.twitter.com"><FaTwitter className="social-icon" /></a>
                {/* LinkedIn icon */}
                <a href="https://www.linkedin.com"><FaLinkedin className="social-icon" /></a>
              </div>
            </div>

            <div className="col" id="services">
              <h3>Services</h3>
              <div className="links">
              <Link to="/text-detector">Text detection</Link>
              <Link to="/audio-detector">Audio detection</Link>
              <Link to="/image-detector">Image detection</Link>
            </div>
            </div>

            <div className="col" id="useful-links">
              <h3>Help</h3>
              <div className="links" id="Help">
              <Link to="/FAQs">FAQs</Link>
              <Link to="/privacy-policy">Our Policy</Link>
              <Link to="/terms-of-service">Services </Link>
              </div>
            </div>

            <div className="col" id="contact">
              <h3>Contact</h3>
              <div className="contact-details">
                <i className="fa fa-location"></i>
                <p>BFCAI <br /> Egypt</p>
              </div>
              <div className="contact-details">
                <i className="fa fa-phone"></i>
                <p>+20102081180</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form">
              <form action="">
                <input type="text" placeholder="Email here..." />
                <button className='BTN'><i className="fa fa-paper-plane"></i></button>
              </form>
            </div>
          </div>

        <div className="col-md-12 text-center">
          <p className='copyright'>&copy; 2024 Catch the AI. All rights reserved.</p>
        </div>
        
        </div>
      </footer>
    );
  }
}
