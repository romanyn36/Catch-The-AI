import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import TextDetector from '../Navbar/text_detector/text-detector';
import Pricing from '../Navbar/pricing/pricing';
import aiImage from './ai.jpg'; // Adjust path as per your file structure
import { useLocation } from 'react-router-dom';
import AboutUs from "../Navbar/AboutUs/AboutUs";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const section = query.get('scrollTo');
    if (section === 'text-detector') {
      const element = document.getElementById('text-detector');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section === 'pricing') {
      const element = document.getElementById('pricing');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }else if (section === 'AboutUs') {
      const element = document.getElementById('AboutUs');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.search]);

  return (
    <div className="Home">
      <MyComponent />
      <div id="text-detector">
        <TextDetector />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="AboutUs">
            <AboutUs/>
      </div>
    </div>
  );
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
                <a href="/?scrollTo=text-detector" className="text-white">Get Started</a>
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
