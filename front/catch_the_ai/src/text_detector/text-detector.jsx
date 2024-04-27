// JSX
import React, { Component } from 'react';
import './text-detector.css';
import styled from "styled-components";

const navItems = [
    { label: "Home", link: "/" },
    { label: "Start", link: "/text-detector" },
    { label: "Pricing", link: "/pricing" },
    { label: "About Us", link: "/about" },
  ];
export class TextDetector extends Component {


    render() {
        return (
            <div className="">
                <MyComponent />

            </div>
        );
    }
}


const mediaData = [
  { id: 1, name: "Images" },
  { id: 2, name: "Text" },
];

function MyComponent() {
  return (
    <MainContainer>
      <MediaTypeHeading>Select Media Type</MediaTypeHeading>
      <MediaTypeButtons>
        {mediaData.map((media) => (
          <MediaTypeButton key={media.id}>{media.name}</MediaTypeButton>
        ))}
      </MediaTypeButtons>
      <UploadSection>
        <UploadContent>
          <UploadText>
            <UploadHeading>Drag And Drop</UploadHeading>
            <UploadSubheading>or</UploadSubheading>
            <UploadDescription>Upload your image</UploadDescription>
          </UploadText>
          <UploadInfo>maximum size 10 Mb</UploadInfo>
        </UploadContent>
      </UploadSection>
      <SubmitButton>AI or Human ?</SubmitButton>
    </MainContainer>
  );
}

const MainContainer = styled.main`
// border-radius: 64px;
  // box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
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


const MediaTypeHeading = styled.h2`
  color: #fff;
  margin-top: 45px;
//   font: 500 40px Marlett, sans-serif;    

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const MediaTypeButtons = styled.div`
  display: flex;
  margin-top: 55px;
  width: 868px;
  max-width: 100%;
  gap: 20px;
  font-size: 20px;
  color: #000;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
  justify-content: space-between;
  padding: 0 16px 9px 0;

  @media (max-width: 991px) {
    flex-wrap: wrap;
    margin-top: 40px;
    white-space: initial;
  }
`;

const MediaTypeButton = styled.button`
  font-family: Manrope, sans-serif;
  justify-content: center;
  align-items: center;
  border-radius: 99px;
  padding: 16px 32px;
  border: none;
  cursor: pointer;

  &:first-child {
    background: linear-gradient(135deg, #bb6bd9 0%, #1bfed5 100%);
  }

  &:last-child {
    background: linear-gradient(135deg, #858981 0%, #a1a8a7 100%);
  }

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`;

const UploadSection = styled.section`
  border: 5px dashed rgba(255, 255, 255, 1);
  background-color: rgba(217, 217, 217, 0.8);
  display: flex;
  margin-top: 36px;
  width: 500px;
  max-width: 100%;
  align-items: center;
  color: #fff;
  font-weight: 800;
  text-align: center;
  justify-content: center;
  padding: 80px 60px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const UploadContent = styled.div`
  display: flex;
  width: 250px;
  max-width: 100%;
  flex-direction: column;
  margin: 15px 0 7px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const UploadText = styled.div`
  font: 36px Manrope, sans-serif;
`;

const UploadHeading = styled.h3`
  font-size: 48px;
  margin: 0;
`;

const UploadSubheading = styled.p`
  font-size: 32px;
  margin: 0;
`;

const UploadDescription = styled.p`
  font-size: 24px;
  margin: 0;
`;

const UploadInfo = styled.p`
  align-self: center;
  margin-top: 31px;
  font: 20px Manrope, sans-serif;
`;

const SubmitButton = styled.button`
  justify-content: center;
  border-radius: 99px;
  background-color: #bb6bd9;
  margin-top: 34px;
  color: #fff;
  text-align: center;
  padding: 16px 18px;
  font: 700 24px Manrope, sans-serif;
  border: none;
  cursor: pointer;
`;


export default TextDetector;
