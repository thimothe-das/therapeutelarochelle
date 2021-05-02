import React, { useState } from "react";
import {
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  /*--------------------------------------------------------------------------------*/
  /*To open NAVBAR in MOBILE VIEW                                                   */
  /*--------------------------------------------------------------------------------*/

  return (
    <div className="topbar" id="top">
      <div className="header6">
        <Container className="po-relative">
          <Navbar className="navbar-expand-lg h6-nav-bar">
            <NavbarBrand href="/">
              <img src={"/white-text.png"} alt="wrapkit" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
              <span className="ti-menu"></span>
            </NavbarToggler>
            <Collapse
              isOpen={isOpen}
              navbar
              className="hover-dropdown font-14 ml-auto"
              id="h6-info"
            >
              <Nav navbar className="ml-auto">
                <NavItem style={{ color: "white", fontWeight: "bold" }}>
                  <a
                    style={{ color: "white", fontWeight: "bold" }}
                    className="nav-link"
                    href={"/components"}
                  >
                    A propos
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    style={{ color: "white", fontWeight: "bold" }}
                    className="nav-link"
                    href={"/custom-components"}
                  >
                    Qui suis-je ?
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    style={{ color: "white", fontWeight: "bold" }}
                    className="nav-link"
                    href={"/custom-components"}
                  >
                    Les différentes thérapies
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    style={{ color: "white", fontWeight: "bold" }}
                    className="nav-link"
                    href={"/custom-components"}
                  >
                    Prestation
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    style={{ color: "white", fontWeight: "bold" }}
                    className="nav-link"
                    href={"/custom-components"}
                  >
                    Contact
                  </a>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};
export default Header;
