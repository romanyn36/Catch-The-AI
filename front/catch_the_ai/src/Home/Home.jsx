import React, { Component } from "react";
import './Home.css';
import TextDetector from '../text_detector/text-detector';
import Pricing from "../pricing/pricing";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <MyComponent />
        <TextDetector />
        <Pricing />
      </div>
    );
  }
}

function MyComponent() {
  return (
    <div className="RootContainer">
      <div className="MainContainer">
        <section className="HeroSection">
          <h2 className="HeroTitle">
            Start Detecting <br />
            <span className="ColoredText">AI-Generated Media</span>
          </h2>
          <div className="HeroContent">
            <p className="HeroDescription">
              Swiftly and accurately detect AI-generated content with our
              advanced models. Our deep learning technology distinguishes between
              AI and human-authored media in images and text.
            </p>
            <img className="HeroImage" src={require('./home.png')} alt="Hero Image" />
          </div>
          <button className="GetStartedButton">Get Started</button>
        </section>
      </div>
    </div>
  );
}

export default Home;
