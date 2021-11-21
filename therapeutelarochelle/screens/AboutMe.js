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
      <Grid item xs={12} sm={8} className={styles.textWrapper}>
        <Typography variant="h3" className={styles.title}>
          {aboutData.acf.title}
        </Typography>
        <Typography variant="h5" className={styles.subtitle}>
          {aboutData.acf.subtitle}
        </Typography>
        <Typography variant="h6" className={styles.bigTextEl}>
          {parse(aboutData.acf.text)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
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
