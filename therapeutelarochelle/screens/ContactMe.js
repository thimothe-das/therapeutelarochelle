import { Button, Grid, Typography, Avatar, TextField } from "@material-ui/core";
import React from "react";

const ContactMe = () => {
  return (
    <>
      <Typography
        align="center"
        style={{ marginBottom: "7px", color: "black" }}
        variant="h4"
      >
        Contactez-moi
      </Typography>
      <Typography
        align="center"
        variant="h6"
        style={{ color: "#727577", margin: "0 25%" }}
      >
        Pour prendre rendez-vous, remplissez le formulaire de contact
        ci-dessous, laissez-moi un message au 06.86.38.47.73 ou envoyez moi un
        mail à l'adresse : therapeutelarochelle@gmail.com. Je vous rappelle
        rapidement.
      </Typography>
      <Grid
        container
        alignItems="center"
        justify="space-evenly"
        spacing={2}
        style={{ margin: "30px 0" }}
      >
        <Grid item xs={5}>
          <Grid container spacing={3} justify="flex-end">
            <Grid item xs={5}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nom et prénom"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField fullWidth variant="outlined" placeholder="Email" />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Numéro de téléphone"
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                placeholder="Message..."
              />
            </Grid>
            <Grid item xs={12}>
              <Typography />
            </Grid>
            <Grid item xs={12}>
              <Button style={{ float: "right" }} variant="outlined">
                Envoyer votre message
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2763.4782903924574!2d-1.2196519844190679!3d46.16113397911534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480154569e0841a3%3A0x8a9af438f797a226!2s5+Rue+de+la+Mare+%C3%A0+la+Besse%2C+17000+La+Rochelle!5e0!3m2!1sfr!2sfr!4v1559487149744!5m2!1sfr!2sfr"
            width="600"
            height="450"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactMe;
