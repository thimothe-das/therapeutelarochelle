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
import LocationOnIcon from "@material-ui/icons/LocationOn";

const duration = 10;

const defaultStyle = {
  transition: "1s",
  width: "0px",
};

const defaultStyleLocation = {
  transition: "1s",
  width: "155px",
  maxHeight: 50,
};

const transitionStyles = {
  entering: {},
  entered: {
    width: "155px",
    paddingLeft: "15px",
  },
  exiting: {},
  exited: { width: "0px" },
};

const transitionStylesLocation = {
  entering: { whiteSpace: "nowrap" },
  entered: {
    width: "255px",
    padding: "0 13px",
    whiteSpace: "normal",
    borderRadius: "15px 5px 5px 15px",
  },
  exiting: { whiteSpace: "nowrap" },
  exited: { width: "0px", whiteSpace: "nowrap" },
};

const transitionStylesMail = {
  entering: {},
  entered: {
    width: "285px",
    paddingLeft: "15px",
  },
  exiting: {},
  exited: { width: "0px" },
};

const Header = ({ HeaderData, refs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [email, setEmail] = useState(false);
  const [address, setAddress] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedAdress, setCopiedAddress] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copiedAdress) setCopiedAddress(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [copiedAdress]);

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
                    Les thérapies
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
                      margin: "0 5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Transition in={phoneNumber} timeout={duration}>
                      {(state) => (
                        <>
                          <Avatar
                            variant="circular"
                            className={styles.contact_button}
                            onClick={() => {
                              setPhoneNumber(!phoneNumber);
                              setEmail(false);
                              setAddress(false);
                            }}
                            style={{
                              border: "2px solid black",
                              backgroundColor: "white",
                              margin: "0 6px",
                            }}
                          >
                            <PhoneIcon fontSize="small" />
                          </Avatar>

                          <Typography
                            style={{
                              ...defaultStyle,
                              ...transitionStyles[state],
                            }}
                            className={styles.contactElement}
                          >
                            {HeaderData.acf.phone}
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
                                        HeaderData.acf.phone
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
                            variant="circular"
                            className={styles.contact_button}
                            onClick={() => {
                              setEmail(!email);
                              setPhoneNumber(false);
                              setAddress(false);
                            }}
                            style={{
                              border: "2px solid black",
                              backgroundColor: "white",
                              margin: "6px 6px",
                            }}
                          >
                            <MailIcon fontSize="small" />
                          </Avatar>

                          <Typography
                            style={{
                              ...defaultStyle,
                              ...transitionStylesMail[state],
                            }}
                            className={styles.contactElement}
                          >
                            {HeaderData.acf.mail}
                            <Tooltip
                              title={copiedAdress ? "Copié !" : "Copier"}
                            >
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
                                      marginLeft: "5px",
                                    }}
                                  />
                                ) : (
                                  <Copy
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        HeaderData.acf.mail
                                      );
                                      setCopiedMail(true);
                                    }}
                                    style={{
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
                    <Transition in={address} timeout={duration}>
                      {(state) => (
                        <>
                          <Avatar
                            variant="circular"
                            className={styles.contact_button}
                            onClick={() => {
                              setEmail(false);
                              setPhoneNumber(false);
                              setAddress(!address);
                            }}
                            style={{
                              border: "2px solid black",
                              backgroundColor: "white",
                              margin: "6px 6px",
                            }}
                          >
                            <LocationOnIcon fontSize="small" />
                          </Avatar>

                          <Typography
                            style={{
                              ...defaultStyleLocation,
                              ...transitionStylesLocation[state],
                            }}
                            className={styles.contactElement}
                          >
                            {HeaderData.acf.address}
                            <Tooltip
                              title={copiedAdress ? "Copié !" : "Copier"}
                            >
                              <IconButton
                                size="small"
                                style={{
                                  padding: 0,
                                  color: "black",
                                  outline: 0,
                                }}
                              >
                                {copiedAdress ? (
                                  <CheckIcon
                                    style={{
                                      color: "green",
                                      marginLeft: "5px",
                                    }}
                                  />
                                ) : (
                                  <Copy
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        HeaderData.acf.address
                                      );
                                      setCopiedAddress(true);
                                    }}
                                    style={{
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
