import { Button, Grid, Typography, Avatar } from "@material-ui/core";
import React from "react";
import DirectionsIcon from "@material-ui/icons/Directions";
import parse from "html-react-parser";
import styles from "screens/AboutMe.module.css";
import Carousel from "components/Carousel";

const MyOffice = ({ aboutData, refs }) => {
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
    <Grid container>
      <Grid item xs={12}>
        <div style={{ margin: "80px 25%" }}>
          <Typography
            align="center"
            style={{ marginBottom: "7px", color: "black" }}
            variant="h3"
          >
            Mon cabinet
          </Typography>
          <Typography align="center" variant="h6">
            Mon cabinet est situé 4 rue du chat percant et permet d'expliquer
            plein de choses intéressantes. Il peut par exemple dire que je suis
            ici ou au contraire que je suis parti plutot loin. Donc n'héistez
            pas à me contadcter au besoin.
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Carousel slides={slideData} heading="example" />
      </Grid>
    </Grid>
  );
};

export default MyOffice;
