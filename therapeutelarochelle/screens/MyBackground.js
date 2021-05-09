import React from "react";
import { Grid, Typography, Avatar } from "@material-ui/core";
import parse from "html-react-parser";

const MyBackground = ({ myBackgroundData, refs }) => {
  const images = Object.values(myBackgroundData.acf.images[0]).filter(
    (image) => image.id
  );
  return (
    <Grid
      ref={(el) => (refs.current["myBackground"] = el)}
      container
      alignItems="flex-start"
      justify="space-evenly"
      style={{ margin: "60px 0" }}
      alignItems="center"
    >
      <Grid item xs={12} sm={7} style={{ padding: "0 20px" }}>
        <Typography variant="h3" style={{ marginBottom: "20px" }}>
          {myBackgroundData.acf.title}
        </Typography>
        <Typography variant="subtitle1">
          {parse(myBackgroundData.acf.description)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Grid container alignItems="center" justify="space-between">
          {images.map((image, index) => (
            <>
              <Grid item xs={6} sm={5}>
                <img style={{ margin: "0 auto" }} src={image.url} />
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyBackground;
