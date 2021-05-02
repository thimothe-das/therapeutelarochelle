import React from "react";
import { Grid, Typography, Avatar, Button } from "@material-ui/core";
import parse from "html-react-parser";

const Pricing = ({ pricingData, refs }) => {
  return (
    <div
      style={{ margin: "150px 0" }}
      ref={(el) => (refs.current["pricing"] = el)}
    >
      <Typography variant="h3" align="center">
        {pricingData.acf.title}
      </Typography>
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={6}
        style={{
          boxShadow: "0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)",
          width: "30%",
          margin: "50px auto",
        }}
      >
        <Grid
          item
          xs={12}
          style={{ backgroundColor: "#46bae2", color: "white" }}
        >
          <Typography variant="h4" align="center" style={{ color: "white" }}>
            {pricingData.acf.prestation_name}
          </Typography>
        </Grid>
        {pricingData.acf.repeteur.map((line, index) => (
          <Grid item xs={12}>
            <Typography style={{ color: "#7a7a7a" }} align="center">
              {parse(line.text)}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button color="primary" variant="contained">
            {pricingData.acf.btn_text}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Pricing;
