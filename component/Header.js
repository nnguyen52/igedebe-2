import React from 'react';
import Link from 'next/link';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Search from './Search';
import CustomButton from './customButton';

const Header = () => {
  return (
    <Navbar expand="lg" className="header_container" collapseOnSelect>
      <div className="logo">
        <Navbar.Brand>
          <Link href="/">
            <a>IGeDeBe</a>
          </Link>
        </Navbar.Brand>
      </div>
      <div>
        <Search />
      </div>
      <div className="menu">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavDropdown
              title={
                <>
                  <CustomButton content="Menu" />
                </>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                <CustomButton content="Documentation" routing="/docs" />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => alert('More awesome features coming soon!')}>
                Further thoughts
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
