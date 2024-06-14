import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import TextDetector from '../Navbar/text_detector/text-detector';
import Pricing from '../Navbar/pricing/pricing'
import { Link } from 'react-router-dom';
// import aiImage from './ai.jpg'; // Adjust path as per your file structure
import aiImage from './home.png'; // Adjust path as per your file structure
import AboutUs from "../Navbar/AboutUs/AboutUs";
import ContactUs from "../Navbar/ContactUs/ContactUs";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <MyComponent />
        <TextDetector />
        <Pricing />
        <AboutUs />
        <ContactUs />
      </div>
    );
  }
}

function MyComponent() {
  return (
    <div className="container RootContainer">
      <div className="MainContainer text-center">
        <section className="HeroSection">
          <h2 className="HeroTitle">
            Start Detecting <br />
           AI-Generated Media
          </h2>
          <div className="HeroContent row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="HeroDescription">
                Swiftly and accurately detect AI-generated content with our
                advanced models. Our deep learning technology distinguishes between
                AI and human-authored media in images and text.
              </p>
              <button className="btn GetStartedButton mt-4">
                <Link to="/text-detector" className="text-white">Get Started</Link>
              </button>
            </div>
            <div className="col-md-6">
            <img className="HeroImage img-fluid" src={aiImage} alt="AI" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;