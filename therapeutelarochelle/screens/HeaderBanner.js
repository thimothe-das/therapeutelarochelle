import React from "react";
import { Container, Row, Col } from "reactstrap";
import parse from "html-react-parser";

export default function HeaderBanner({ headerBannerData }) {
  return (
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
            <h1 className="title">{headerBannerData.acf.principal_title}</h1>
            <h4 className="subtitle font-light">
              {parse(headerBannerData.acf.subtitle)}
            </h4>

            <a
              href="/#coming"
              className="btn btn-md m-t-30 btn-info-gradiant font-14"
            >
              Découvrir
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
