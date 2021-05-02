import React from "react";
import { Grid, Typography, Avatar, Button } from "@material-ui/core";

const Pricing = () => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={6}
        style={{
          boxShadow: "0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)",
          width: "35%",
          margin: "100px auto",
        }}
      >
        <Grid
          item
          xs={12}
          style={{ backgroundColor: "#46bae2", color: "white" }}
        >
          <Typography variant="h4" align="center" style={{ color: "white" }}>
            Séance individuelle ou de couple
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Durée d'une séance : 50 minutes en moyenne
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Le nombre de séances est variable selon les personnes, la nature de
            leurs difficultés et leurs objectifs
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Le tarif d'une consultation est de : 60€
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Possibilités d'aménagement tarifaire en fonction de situations
            particulières
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Durée d'une séance : 50 minutes en moyenne
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button color="primary" variant="contained">
            Prendre rdv
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Pricing;
