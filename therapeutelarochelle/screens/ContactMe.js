import { Button, Grid, Typography, Avatar, TextField } from "@material-ui/core";
import React, { useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import styles from "screens/ContactMe.module.css";

const ContactMe = ({ contactData, refs }) => {
  const [completename, setCompletename] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function submitForm() {
    var bodyFormData = new FormData();
    bodyFormData.append("completename", completename);
    bodyFormData.append("email", email);
    bodyFormData.append("phone", phone);
    bodyFormData.append("message", message);

    axios({
      method: "post",
      url:
        "http://localhost:8000/wp-json/contact-form-7/v1/contact-forms/128/feedback",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        //handle success
        console.log(response);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  }

  return (
    <>
      <Typography
        ref={(el) => (refs.current["contactMe"] = el)}
        align="center"
        style={{ marginBottom: "7px", color: "black" }}
        variant="h4"
      >
        {contactData.acf.title}
      </Typography>
      <Typography align="center" variant="h6" className={styles.subtitle}>
        {parse(contactData.acf.subtitle)}
      </Typography>
      <Grid
        container
        alignItems="center"
        justify="space-evenly"
        spacing={2}
        style={{ margin: "30px 0" }}
      >
        <Grid item xs={10} sm={5}>
          <Grid container spacing={3} justify="flex-end">
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                onChange={(e) => setCompletename(e.target.value)}
                variant="outlined"
                placeholder={contactData.acf.form.first_field}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder={contactData.acf.form.second_field}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder={contactData.acf.form.third_field}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                placeholder={contactData.acf.form.fourth_field}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ float: "right" }}
                variant="outlined"
                onClick={() => submitForm()}
              >
                {contactData.acf.form.btn_text}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <iframe
            className={styles.googleMaps}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2763.4782903924574!2d-1.2196519844190679!3d46.16113397911534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480154569e0841a3%3A0x8a9af438f797a226!2s5+Rue+de+la+Mare+%C3%A0+la+Besse%2C+17000+La+Rochelle!5e0!3m2!1sfr!2sfr!4v1559487149744!5m2!1sfr!2sfr"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactMe;
