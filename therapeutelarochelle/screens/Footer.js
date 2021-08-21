import { Button, Grid, Typography, Avatar } from "@material-ui/core";
import React from "react";
import DirectionsIcon from "@material-ui/icons/Directions";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#363e50", padding: "25px" }}>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid container xs={8}>
          <Grid item xs={6}>
            {/* <Typography style={{ color: "white" }}>
              Les différentes thérapies
            </Typography> */}
          </Grid>
          <Grid item xs={12}>
            {/* <Typography style={{ color: "white" }}>
              LE BLOG ET LE QUIZ ARRIVENT BIENTÔT
            </Typography> */}
            <Typography style={{ color: "white" }} align="right">
              Jean-philippe DAS - Thérapeute à La Rochelle ©
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
