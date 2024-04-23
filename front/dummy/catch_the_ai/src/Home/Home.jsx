import React, { Component } from "react";
import './Home.css';
import { TextDetector } from '../text_detector/text-detector';
import Pricing from './pricing'; // Import the Pricing component
import styled from "styled-components";
export class Home extends Component {
  render() {
    return (
      <div className="Home">



        <MyComponent />
        <TextDetector />



      </div>




    );
  }
}












const navItems = [
  { label: "Home", link: "/" },
  { label: "Start", link: "/text-detector" },
  { label: "Pricing", link: "/pricing" },
  { label: "About Us", link: "/about" },
];

function MyComponent() {
  return (
    <MainContainer>
      <Header>
        <Nav>
          <Logo>Catch The AI</Logo>
          <NavList>
            {navItems.map((item) => (
              <NavItem key={item.label}>
                <NavLink href={item.link}>{item.label}</NavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>
        <AuthButtons>
          <SignUpButton>Sign Up</SignUpButton>
          <SignInButton>Sign In</SignInButton>
        </AuthButtons>
      </Header>
      <HeroSection>
        <HeroTitle>
          Start Detecting <BrandText>
          <br></br>AI-Generated Media</BrandText>
        </HeroTitle>
        <HeroContent>
          <HeroText>
            <HeroDescription>
              Swiftly and accurately detect AI-generated content with our
              advanced models. Our deep learning technology distinguishes
              between AI and human-authored media in images and text.
            </HeroDescription>
            <GetStartedButton>Get Started</GetStartedButton>
          </HeroText>
          <HeroImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/2810289fab9468aaa5ac9bcefc68f088b5be9b0df0c26b538845081cbff79d32?apiKey=6a476df83ed34c79b17b6da21d1f5a8d&" alt="Hero Image" />
        </HeroContent>
      </HeroSection>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  // border-radius: 64px;
  background: linear-gradient(135deg, #252e4d 0%, #15182d 100%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 75px 64px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const Logo = styled.h1`
  color: #fff;
`;

const NavList = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  font: 600 18px Manrope, sans-serif;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 20px;
  color: #fff;
  font-weight: 800;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const SignUpButton = styled.button`
  letter-spacing: 1.8px;
  margin: auto 0;
  font: 18px Manrope, sans-serif;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
`;

const SignInButton = styled.button`
  border-radius: 99px;
  background-color: #bb6bd9;
  padding: 14px 32px;
  font: 20px Manrope, sans-serif;
  color: inherit;
  border: none;
  cursor: pointer;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-top: 87px;
  width: 100%;
  max-width: 1165px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const HeroTitle = styled.h2`
  color: #fff;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  text-transform: capitalize;
  font: 700 60px/120px Manrope, sans-serif;

  @media (max-width: 991px) {
    font-size: 40px;
    line-height: 56px;
  }
`;

const BrandText = styled.span`
  color: #706af6;
`;

const HeroContent = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 27px;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const HeroText = styled.div`
  flex: 1;
  color: #fff;
  text-align: center;
`;

const HeroDescription = styled.p`
  font: 700 32px Manrope, sans-serif;
`;

const GetStartedButton = styled.button`
  border-radius: 99px;
  background-color: #bb6bd9;
  margin-top: 44px;
  padding: 13px 15px;
  font: 800 36px Manrope, sans-serif;
  color: inherit;
  border: none;
  cursor: pointer;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const HeroImage = styled.img`
  aspect-ratio: 1.04;
  object-fit: cover;
  width: 100%;
  max-width: 29%;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

