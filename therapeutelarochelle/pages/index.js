import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeaderBanner from "screens/HeaderBanner";
import Header from "screens/Header";
import AboutMe from "screens/AboutMe";
import React, { useState, useEffect, useRef } from "react";
import ProposedTherapies from "screens/ProposedTherapies";
import MyBackground from "screens/MyBackground";
import Pricing from "screens/Pricing";
import ContactMe from "screens/ContactMe";
import Footer from "screens/Footer";

export default function Home({
  headerBannerData,
  aboutData,
  proposedTherapiesData,
  myBackgroundData,
  pricingData,
  contactData,
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
  });

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div id="main-wrapper">
        <Header refs={refs} />
        <div className="page-wrapper">
          <div
            className="container-fluid"
            style={{ height: windowHeight + "px" }}
          >
            <HeaderBanner headerBannerData={headerBannerData[0]} />
          </div>
          <AboutMe refs={refs} aboutData={aboutData[0]} />
          <ProposedTherapies
            refs={refs}
            proposedTherapiesData={proposedTherapiesData[0]}
          />
          <MyBackground refs={refs} myBackgroundData={myBackgroundData[0]} />
          <Pricing refs={refs} pricingData={pricingData[0]} />
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
  const res = await fetch("http://localhost:8000/wp-json/wp/v2/pages");
  const data = await res.json();

  const headerBannerData = data.filter((page) => page.slug === "headerbanner");
  const aboutData = data.filter((page) => page.slug === "about");
  const proposedTherapiesData = data.filter(
    (page) => page.slug === "proposed_therapies"
  );
  const pricingData = data.filter((page) => page.slug === "pricing");
  const myBackgroundData = data.filter((page) => page.slug === "mybackground");
  const contactData = data.filter((page) => page.slug === "contact");
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
    },
  };
}
