import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Navbar = () => {
  return (
    <Nav>
      <Logo to="/">SON GIF YAPP 5</Logo>
      <Links>
        <LinkItem>
          <NavLink to="/">Home</NavLink>
        </LinkItem>
        <LinkItem>
          <NavLink to="/favori">Favori</NavLink>
        </LinkItem>
      </Links>
    </Nav>
  );
};
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
`;

const Links = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-left: 2rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  position: relative;
  transition: all 0.2s ease-in-out;

  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: -0.1rem;
    left: 0;
    width: 100%;
    height: 0.1rem;
    background-color: #333;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    &:after {
      transform: scaleX(1);
    }
  }
`;

export default Navbar;
