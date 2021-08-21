import { Button, Grid, Typography, Avatar } from "@material-ui/core";
import React from "react";
import DirectionsIcon from "@material-ui/icons/Directions";
import parse from "html-react-parser";
import styles from "screens/AboutMe.module.css";
import Carousel from "components/Carousel";

const MyOffice = ({ myOfficeData, refs }) => {
  const slideData = [
    {
      index: 0,
      headline: "New Fashion Apparel",
      button: "Shop now",
      src: "https://administration.therapeutelarochelle.fr/wp-content/uploads/2021/05/right-side-image_2.jpg",
    },
    {
      index: 1,
      headline: "In The Wilderness",
      button: "Book travel",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg",
    },
    {
      index: 2,
      headline: "For Your Current Mood",
      button: "Listen",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg",
    },
    {
      index: 3,
      headline: "Focus On The Writing",
      button: "",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg",
    },
  ];
  return (
    <Grid
      container
      className="thematic-container"
      style={{ position: "relative" }}
    >
      <Grid item xs={12}>
        <div className="intro-container">
          <Typography align="center" className="intro-title" variant="h3">
            {myOfficeData.acf.titre}
          </Typography>
          <Typography align="center" className="intro-description" variant="h6">
            {myOfficeData.acf.sous_titre}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} style={{ overflow: "hidden" }}>
        <Carousel slides={myOfficeData.acf.images} heading="example" />
      </Grid>
    </Grid>
  );
};

export default MyOffice;
