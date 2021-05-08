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
              opacity: 0.02,
            },
            move: {
              direction: "right",
              speed: 0.05,
            },
            size: {
              value: 1,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05,
              },
            },
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: "push",
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
          <Row className="justify-content-center">
            <Col lg="8" md="6" className="align-self-center text-center">
              <h1 className="title noselect">
                {headerBannerData.acf.principal_title}
              </h1>
              <h4 className="subtitle font-light noselect">
                {parse(headerBannerData.acf.subtitle)}
              </h4>

              <a
                onClick={() =>
                  refs.current.aboutMe.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                style={{ color: "white" }}
                className="btn btn-md m-t-30 btn-info-gradiant font-14"
              >
                Qui suis-je ?
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
