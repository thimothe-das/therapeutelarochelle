import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import DirectionsIcon from "@material-ui/icons/Directions";

const ProposedTherapies = ({ proposedTherapiesData }) => {
  const [selectedTherapy, setSelectedTherapy] = useState("schemas");
  return (
    <div style={{ margin: "150px 0" }}>
      {console.log("#############", proposedTherapiesData)}
      <div style={{ marginBottom: "80px" }}>
        <Typography
          align="center"
          style={{ marginBottom: "7px", color: "black" }}
          variant="h3"
        >
          {proposedTherapiesData.acf.title}
        </Typography>
        <Typography
          align="center"
          variant="h6"
          style={{ color: "#727577", margin: "0 25%" }}
        >
          {proposedTherapiesData.acf.subtitle}
        </Typography>
      </div>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ margin: "35px 0" }}
      >
        {proposedTherapiesData.acf.liste_des_therapies_proposees.map(
          (therapy, index) => (
            <Grid
              key={therapy.groude_de_champs_dune_therapie.logo.id}
              item
              xs={2}
              style={{
                margin: "30px 70px",
                backgroundColor: selectedTherapy === index && "#f2745f",
                borderRadius: "3px",
                padding: "25px 0",
                cursor: "pointer",
              }}
              onClick={() => setSelectedTherapy(index)}
            >
              <Avatar
                style={{
                  backgroundColor: "white",
                  margin: "15px auto",
                  padding: "15px",
                  width: "100px",
                  height: "100px",
                }}
                alt="Remy Sharp"
                src={therapy.groude_de_champs_dune_therapie.logo.url}
              />
              <Typography
                align="center"
                style={{
                  fontWeight: "bold",
                  color: selectedTherapy === index && "white",
                }}
              >
                {therapy.groude_de_champs_dune_therapie.btn_title}
              </Typography>
            </Grid>
          )
        )}
      </Grid>
      <br />
      <br />
      {proposedTherapiesData.acf.liste_des_therapies_proposees.map(
        (therapy, index) =>
          selectedTherapy === index && (
            <>
              <Grid
                key={therapy.groude_de_champs_dune_therapie.logo.id}
                container
                alignItems="flex-start"
                justify="center"
              >
                <Grid item xs={5} style={{ padding: "0 20px" }}>
                  <Typography variant="h5" style={{ marginBottom: "20px" }}>
                    {therapy.groude_de_champs_dune_therapie.description_title}
                  </Typography>
                  <Typography
                    style={{ color: "#7a7a7a" }}
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html:
                        therapy.groude_de_champs_dune_therapie.description,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <img
                    style={{ width: "600px" }}
                    src="right-side-image_5.jpg"
                  />
                </Grid>
              </Grid>
            </>
          )
      )}
    </div>
  );
};

export default ProposedTherapies;
