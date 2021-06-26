import { Button, Grid, Typography, Avatar } from "@material-ui/core";
import React from "react";
import DirectionsIcon from "@material-ui/icons/Directions";
import parse from "html-react-parser";
import styles from "screens/AboutMe.module.css";

const AboutMe = ({ aboutData, refs }) => {
  return (
    <Grid
      container
      style={{ backgroundColor: "#495057", position: "relative" }}
      alignItems="center"
      ref={(el) => (refs.current["aboutMe"] = el)}
    >
      <Grid item xs={12} sm={7} className={styles.textWrapper}>
        <Typography
          style={{ marginBottom: "7px", color: "white" }}
          variant="h3"
        >
          {aboutData.acf.title}
        </Typography>
        <Typography
          variant="h5"
          style={{ margin: "30px 0", color: "white", fontWeight: "bold" }}
        >
          {aboutData.acf.subtitle}
        </Typography>
        <Typography
          variant="h6"
          style={{ color: "white", textAlign: "justify" }}
        >
          {parse(aboutData.acf.text)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Avatar
          className={styles.avatarImg}
          classes={{ img: styles.avatarImg }}
          src={aboutData.acf.therapeute_img.url}
        />
      </Grid>
    </Grid>
  );
};

export default AboutMe;
