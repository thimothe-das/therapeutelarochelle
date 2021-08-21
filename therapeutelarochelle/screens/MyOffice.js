import { Grid, Typography } from "@material-ui/core";
import React from "react";

import Carousel from "components/Carousel";

const MyOffice = ({ myOfficeData, refs }) => {
  return (
    <Grid
      container
      className="thematic-container"
      style={{ position: "relative" }}
      ref={(el) => (refs.current["myOffice"] = el)}
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
