import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import DirectionsIcon from "@material-ui/icons/Directions";
import parse from "html-react-parser";
import styles from "screens/ProposedTherapies.module.css";

const ProposedTherapies = ({ proposedTherapiesData, refs }) => {
  const [selectedTherapy, setSelectedTherapy] = useState(0);
  const refDescription = useRef(null);
  return (
    <div
      style={{ margin: "150px 0" }}
      ref={(el) => (refs.current["proposedTherapies"] = el)}
    >
      <div style={{ marginBottom: "80px" }}>
        <Typography
          align="center"
          style={{ marginBottom: "7px", color: "black" }}
          variant="h3"
        >
          {proposedTherapiesData.acf.title}
        </Typography>
        {console.log(proposedTherapiesData)}
        <Typography align="center" variant="h6" className={styles.subtitle}>
          {proposedTherapiesData.acf.subtitle}
        </Typography>
      </div>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ margin: "35px 0" }}
        ref={refDescription}
      >
        {proposedTherapiesData.acf.liste_des_therapies_proposees.map(
          (therapy, index) => (
            <Grid
              key={therapy.therapy_elements.logo.id}
              item
              xs={4}
              sm={2}
              className={styles.therapyButton}
              style={{
                backgroundColor: selectedTherapy === index && "#f2745f",
              }}
              onClick={() => {
                setSelectedTherapy(index);
                refDescription.current.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <Avatar
                style={{
                  backgroundColor: "white",
                  margin: "15px auto",
                  padding: "15px",
                  width: "100px",
                  height: "100px",
                }}
                src={therapy.therapy_elements.logo.url}
              />
              <Typography
                align="center"
                style={{
                  fontWeight: "bold",
                  color: selectedTherapy === index && "white",
                }}
              >
                {therapy.therapy_elements.btn_title}
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
                key={therapy.therapy_elements.logo.id}
                container
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12} sm={6} style={{ padding: "0 20px" }}>
                  <Typography variant="h5" style={{ marginBottom: "20px" }}>
                    {therapy.therapy_elements.description_title}
                  </Typography>
                  <Typography
                    className={styles.descriptionTherapy}
                    style={{ color: "#7a7a7a" }}
                    variant="body1"
                  >
                    {parse(therapy.therapy_elements.description)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <img
                    style={{ width: "96%" }}
                    src={therapy.therapy_elements.img.url}
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
