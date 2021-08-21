import React from "react";
import { Container, Row, Col } from "reactstrap";
import parse from "html-react-parser";
import Particles from "react-particles-js";

export default function HeaderBanner({ headerBannerData, refs }) {
  return (
    <>
      <Particles
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          top: "60px",
          inset: "0 0",
          zIndex: 1,
        }}
        params={{
          particles: {
            number: {
              value: 60,
              density: {
                enable: true,
                value_area: 1500,
              },
            },
            line_linked: {
              enable: true,
              opacity: 0.2,
            },
            move: {
              direction: "linear",
              speed: 4,
            },
            size: {
              value: 1,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.65,
              },
            },
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: "push",
              },
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                particles_nb: 1,
              },
            },
          },
          retina_detect: true,
        }}
      />
      <div
        className="static-slider-head"
        style={{
          height: "100%",
          backgroundImage: `url(${headerBannerData.acf.background_img.url})`,
        }}
      >
        <Container>
          <Row style={{ justifyContent: "center !important" }}>
            <Col
              lg="8"
              md="6"
              style={{
                textAlign: "center !important",
                selfAlign: "center !important",
              }}
            >
              <h1 className="title noselect">
                {headerBannerData.acf.principal_title}
              </h1>
              <h4
                className="subtitle noselect"
                style={{
                  color: "#ffffff",
                  lineheight: "30px",
                  fontWeight: "300",
                }}
              >
                {parse(headerBannerData.acf.subtitle)}
              </h4>
            </Col>
          </Row>
        </Container>
        <a
          onClick={() =>
            refs.current.aboutMe.scrollIntoView({
              behavior: "smooth",
            })
          }
          style={{
            color: "white",
            zIndex: 2,
            margin: "30px auto",
            fontSize: "14px",
            background: "linear-gradient(to right, #188ef4 0%, #316ce8 100%)",
          }}
          className="btn btn-md m-t-30 btn-info-gradiant font-14"
        >
          Qui suis-je ?
        </a>
      </div>
    </>
  );
}
