import { Button, Grid, Typography, Avatar } from "@material-ui/core";
import React from "react";
import DirectionsIcon from "@material-ui/icons/Directions";

const AboutMe = ({ aboutData }) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={7} style={{ padding: "86px" }}>
        <Typography
          style={{ marginBottom: "7px", color: "black" }}
          variant="h3"
        >
          {aboutData.acf.title}
        </Typography>
        <Typography
          variant="h5"
          style={{ margin: "30px 0", color: "#727577", fontWeight: "bold" }}
        >
          {aboutData.acf.subtitle}
        </Typography>
        <Typography
          variant="h6"
          style={{ color: "#727577" }}
          dangerouslySetInnerHTML={{
            __html: aboutData.acf.text,
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <Avatar
          style={{ width: "450px", height: "450px", margin: "0 auto" }}
          src="/right-side-image_2.jpg"
        />
      </Grid>
    </Grid>
  );
};

export default AboutMe;
