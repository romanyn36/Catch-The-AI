import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import LogoIcon from "./IMG-20240309-WA0012.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible
    }));
  };

  render() {
    const { menuVisible } = this.state;

    return (
      <nav className="navbar navbar-expand-lg custom-navbar">
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

            <SignInButton ><link to="/Sign-In"> Sign In</link></SignInButton> 
          </AuthButtons>
        </Header>
      </nav>
    );
  }
}

const navItems = [
  { label: "Home", link: "/" },
  { label: "Start", link: "/text-detector" },
  { label: "Pricing", link: "/pricing" },
  { label: "About Us", link: "/about" },
];


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

const StyledSignInButton = styled.button`
  border-radius: 99px;
  background-color: #bb6bd9;
  padding: 14px 32px;
  font: 20px Manrope, sans-serif;
  color: inherit;
  border: none;
  cursor: pointer;
`;

function SignInButton() {
  return (
    <StyledSignInButton>
      {/* Use Link component instead of anchor tag */}
      <Link to="/Sign-In" style={{ textDecoration: 'none', color: 'inherit' }}>Sign In</Link>
    </StyledSignInButton>
  );
}