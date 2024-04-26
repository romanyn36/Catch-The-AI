import React, { Component } from "react";
import './Home.css';
import { TextDetector } from '../text_detector/text-detector';
import Pricing from './pricing'; 

import styled from "styled-components";
export class Home extends Component {
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
    <RootContainer>
      <MainContainer>

        <HeroSection>
          <HeroTitle>
            Start Detecting <br />
            <ColoredText>AI-Generated Media</ColoredText>
          </HeroTitle>
          <HeroContent>
            <HeroDescription>
              Swiftly and accurately detect AI-generated content with our
              advanced models. Our deep learning technology distinguishes between
              AI and human-authored media in images and text.
            </HeroDescription>
            <HeroImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd1991c8ae0805c9735bbc2e3a7cd7a827e8bac008916f7e55e7f4a6415e7c8b?apiKey=e44401a3b8aa4f0a9012ff74cb907d4d&" alt="Hero Image" />
          </HeroContent>
          <GetStartedButton>Get Started</GetStartedButton>
        </HeroSection>
      </MainContainer>
    </RootContainer>
  );
}

const MainContainer = styled.main`
  border-radius: 44px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 75px 64px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const RootContainer = styled.div`
background-color:#241440;
`;


const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 1450px;
`;

const HeroTitle = styled.h2`
  color: white;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  text-transform: capitalize;
  margin-top: 10px;
  font: 700 50px/120px Manrope, sans-serif;

  @media (max-width: 991px) {
    font-size: 40px;
    line-height: 56px;
  }
`;

const ColoredText = styled.span`
  color: #a038cc;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 82px;
  color: #fff;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const HeroDescription = styled.p`
  font: 700 32px Manrope, sans-serif;
  max-width: 600px;

  @media (max-width: 991px) {
    font-size: 24px;
  }
`;

const GetStartedButton = styled.button`
  justify-content: center;
  border-radius: 99px;
  background-color: #c34da9;
  margin-top: 30px;
  margin-left: -360px;
  margin-bottom: 200px;
  padding: 13px 15px;
  font: 600 26px Manrope, sans-serif;
  color: white;
  border: none;
  cursor: pointer;

  @media (max-width: 991px) {
    margin-top: 40px;
    font-size: 24px;
  }
`;

const HeroImage = styled.img`
  width: 308px;
  max-width: 100%;
  margin-top: 32px;
  margin-left:50px;
`;

export default MyComponent;








