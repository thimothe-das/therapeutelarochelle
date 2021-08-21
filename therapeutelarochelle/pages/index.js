import styles from "../styles/Home.module.css";
import HeaderBanner from "screens/HeaderBanner";
import Header from "screens/Header";
import AboutMe from "screens/AboutMe";
import React, { useState, useEffect, useRef } from "react";
import ProposedTherapies from "screens/ProposedTherapies";
import MyBackground from "screens/MyBackground";
import Pricing from "screens/Pricing";
import ContactMe from "screens/ContactMe";
import MyOffice from "screens/MyOffice";
import Separator from "components/Separator";

import Footer from "screens/Footer";
import Meta from "screens/Meta";

export default function Home({
  headerBannerData,
  aboutData,
  proposedTherapiesData,
  myBackgroundData,
  myOfficeData,
  pricingData,
  contactData,
  metaData,
}) {
  const [windowHeight, setWindowHeight] = useState(100);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  const refs = useRef({
    aboutMe: null,
    proposedTherapies: null,
    myBackground: null,
    pricing: null,
    contactMe: null,
    myOffice: null,
  });

  return (
    <>
      <Meta metaData={metaData[0]} />
      <div id="main-wrapper">
        <Header HeaderData={headerBannerData[0]} refs={refs} />
        <div className="page-wrapper">
          <div
            className="container-fluid"
            style={{ height: windowHeight + "px" }}
          >
            <HeaderBanner headerBannerData={headerBannerData[0]} refs={refs} />
          </div>
          <AboutMe refs={refs} aboutData={aboutData[0]} />
          <MyOffice refs={refs} myOfficeData={myOfficeData[0]} />
          <Separator
            color="linear-gradient(90deg, rgb(160 153 153), rgb(212 209 209), rgb(160 153 153))"
            width="80%"
            thickness="2px"
          />

          <ProposedTherapies
            refs={refs}
            proposedTherapiesData={proposedTherapiesData[0]}
          />
          <Separator
            color="linear-gradient(90deg, rgb(160 153 153), rgb(212 209 209), rgb(160 153 153))"
            width="80%"
            thickness="2px"
          />
          <MyBackground refs={refs} myBackgroundData={myBackgroundData[0]} />
          <Separator
            color="linear-gradient(90deg, rgb(160 153 153), rgb(212 209 209), rgb(160 153 153))"
            width="80%"
            thickness="2px"
          />
          <Pricing refs={refs} pricingData={pricingData[0]} />
          <Separator
            color="linear-gradient(90deg, rgb(160 153 153), rgb(212 209 209), rgb(160 153 153))"
            width="80%"
            thickness="2px"
          />
          <ContactMe refs={refs} contactData={contactData[0]} />
          <Footer />
        </div>
      </div>
    </>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch(process.env.API_BASE + "wp-json/wp/v2/pages");
  const data = await res.json();
  const headerBannerData = data.filter((page) => page.slug === "headerbanner");
  const aboutData = data.filter((page) => page.slug === "about");
  const proposedTherapiesData = data.filter(
    (page) => page.slug === "proposed_therapies"
  );
  const myOfficeData = data.filter((page) => page.slug === "my_office");

  const pricingData = data.filter((page) => page.slug === "pricing");
  const myBackgroundData = data.filter((page) => page.slug === "mybackground");
  const contactData = data.filter((page) => page.slug === "contact");
  const metaData = data.filter((page) => page.slug === "meta");
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: {
      headerBannerData,
      aboutData,
      proposedTherapiesData,
      myBackgroundData,
      pricingData,
      contactData,
      metaData,
      myOfficeData,
    },
    revalidate: 1,
  };
}
