import React from "react";
import { Grid, Typography, Avatar } from "@material-ui/core";

const MyBackground = () => {
  return (
    <Grid
      container
      alignItems="flex-start"
      justify="center"
      style={{ margin: "60px 0" }}
    >
      <Grid item xs={6} style={{ padding: "0 20px" }}>
        <Typography variant="h3" style={{ marginBottom: "20px" }}>
          Mon parcours de thérapeute
        </Typography>
        <Typography variant="subtitle1">
          Cette thérapie peut être exercée par des travailleurs sociaux, des
          psychologues, des thérapeutes. Plus qu'à la psychologie de l'individu,
          la thérapie familiale regarde les difficultés d’une personne au
          travers des relations entre les différents membres d’une même famille.
          Souvent, le premier motif de consultation est au sujet d’un enfant qui
          présente des difficultés que la famille peine à résoudre. Paul, 12 ans
          a des résultats catastrophiques au collège et rentre de plus en plus
          tardivement au domicile de ses parents. Sa mère qui l’amène en
          consultation comprend rapidement que ce problème de comportement
          apparent parle d’une souffrance de son fils. L’apport de la systémie
          va permettre de regarder ce symptôme comme le révélateur d’une
          problématique plus large, qui met à mal le bien-être familial. Paul a
          tout d’abord été reçu avec ses parents et son petit frère tous les 15
          jours. Au bout de quelques séances, il est apparu nécessaire de
          recevoir uniquement ses parents, en tant que couple parental puis en
          tant que couple conjugal, confronté à des tensions depuis la mort de
          la mère de Monsieur. Cet homme a également bénéficié de séances d’EMDR
          afin de l’aider face à la perte de sa mère
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Avatar
          style={{ width: "450px", height: "450px", margin: "0 auto" }}
          src="/right-side-image_2.jpg"
        />
      </Grid>
    </Grid>
  );
};

export default MyBackground;
