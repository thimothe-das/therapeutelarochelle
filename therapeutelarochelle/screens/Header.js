import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";

import {
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { Avatar, Grid, Hidden, Tooltip } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import styles from "screens/Header.module.css";
import { Typography, IconButton } from "@material-ui/core";
import Copy from "assets/Copy";
import CheckIcon from "@material-ui/icons/Check";
const duration = 10;

const defaultStyle = {
  transition: "1s",
  width: "0px",
  overflow: "hidden",
  padding: "2px 20px",
  backgroundColor: "white",
  color: "black",
  borderRadius: "0 3px 3px 0",
};

const transitionStyles = {
  entering: {
    overflow: "hidden",
    padding: "2px 20px",
  },
  entered: {
    transition: "1s",
    width: "160px",
    overflow: "hidden",
    padding: "2px 20px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "0 3px 3px 0",
    marginLeft: "-15px",
  },
  exiting: {
    overflow: "hidden",
    padding: "2px 20px",
  },
  exited: { width: "0px", overflow: "hidden", padding: "2px 0" },
};

const transitionStylesMail = {
  entering: {
    overflow: "hidden",
    padding: "3px 10px",
  },
  entered: {
    transition: "1s",
    width: "290px",
    overflow: "hidden",
    marginLeft: "-15px",
    padding: "2px 20px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "0 3px 3px 0",
  },
  exiting: {
    overflow: "hidden",
    padding: "2px 20px",
  },
  exited: { width: "0px", overflow: "hidden", padding: "3px 0" },
};

const defaultStyleIcon = {
  backgroundColor: "white",
  borderRadius: "15px",
};

const transitionStylesIcon = {
  entering: {
    borderRadius: "15px 0 0 15px",
  },
  entered: {
    borderRadius: "15px 0 0 15px",
  },
  exiting: {
    borderRadius: "15px 0 0 15px",
  },
  exited: { borderRadius: "15px" },
};

const Header = ({ HeaderData, refs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [email, setEmail] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMail, setCopiedMail] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copiedPhone) setCopiedPhone(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [copiedPhone]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copiedMail) setCopiedMail(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [copiedMail]);

  return (
    <div className="topbar" id="top">
      <div className="header6">
        <Container className="po-relative">
          <Navbar className="navbar-expand-lg h6-nav-bar">
            <NavbarBrand href="/">
              <img src={HeaderData.acf.logo.url} alt="wrapkit" />
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
                    className={`${styles.navlink} nav-link`}
                    onClick={() =>
                      refs.current.aboutMe.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    A propos
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    className={`${styles.navlink} nav-link`}
                    onClick={() =>
                      refs.current.myBackground.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Qui suis-je ?
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    className={`${styles.navlink} nav-link`}
                    onClick={() =>
                      refs.current.myOffice.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Mon cabinet
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    className={`${styles.navlink} nav-link`}
                    onClick={() =>
                      refs.current.proposedTherapies.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Les différentes thérapies
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    className={`${styles.navlink} nav-link`}
                    onClick={() =>
                      refs.current.pricing.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Prestation
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    className={`${styles.navlink} nav-link`}
                    onClick={() =>
                      refs.current.contactMe.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Contact
                  </a>
                </NavItem>
                <Hidden>
                  <NavItem
                    style={{
                      margin: "0 5px 0 5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Transition in={phoneNumber} timeout={duration}>
                      {(state) => (
                        <>
                          <Avatar
                            style={{
                              ...defaultStyleIcon,
                              ...transitionStylesIcon[state],
                            }}
                            variant="circular"
                            className={styles.contact_button}
                            onClick={() => {
                              setPhoneNumber(!phoneNumber);
                              setEmail(false);
                            }}
                            style={{
                              border: "2px solid black",
                              backgroundColor: "white",
                            }}
                          >
                            <PhoneIcon fontSize="small" />
                          </Avatar>

                          <Typography
                            style={{
                              ...defaultStyle,
                              ...transitionStyles[state],
                              display: "flex",
                            }}
                          >
                            06.48.75.97.53
                            <Tooltip title={copiedPhone ? "Copié !" : "Copier"}>
                              <IconButton
                                size="small"
                                style={{
                                  padding: 0,
                                  color: "black",
                                  outline: 0,
                                }}
                              >
                                {copiedPhone ? (
                                  <CheckIcon
                                    style={{
                                      color: "green",
                                      position: "relative",
                                      marginLeft: "5px",
                                    }}
                                  />
                                ) : (
                                  <Copy
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        "06.48.75.97.53"
                                      );
                                      setCopiedPhone(true);
                                    }}
                                    style={{
                                      position: "relative",
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </>
                      )}
                    </Transition>
                  </NavItem>
                  <NavItem
                    style={{
                      margin: "0 5px 0 5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Transition in={email} timeout={duration}>
                      {(state) => (
                        <>
                          <Avatar
                            style={{
                              ...defaultStyleIcon,
                              ...transitionStylesIcon[state],
                            }}
                            variant="circular"
                            className={styles.contact_button}
                            onClick={() => {
                              setEmail(!email);
                              setPhoneNumber(false);
                            }}
                            style={{
                              border: "2px solid black",
                              backgroundColor: "white",
                            }}
                          >
                            <MailIcon fontSize="small" />
                          </Avatar>

                          <Typography
                            style={{
                              ...defaultStyle,
                              ...transitionStylesMail[state],
                              display: "flex",
                            }}
                          >
                            therapeutelarochelle@gmail.com
                            <Tooltip title={copiedMail ? "Copié !" : "Copier"}>
                              <IconButton
                                size="small"
                                style={{
                                  padding: 0,
                                  color: "black",
                                  outline: 0,
                                }}
                              >
                                {copiedMail ? (
                                  <CheckIcon
                                    style={{
                                      color: "green",
                                      position: "relative",
                                      marginLeft: "5px",
                                    }}
                                  />
                                ) : (
                                  <Copy
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        "therapeutelarochelle@gmail.com"
                                      );
                                      setCopiedMail(true);
                                    }}
                                    style={{
                                      position: "relative",
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </>
                      )}
                    </Transition>
                  </NavItem>
                </Hidden>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};
export default Header;
