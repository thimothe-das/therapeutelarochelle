import {
  Button,
  Grid,
  Typography,
  TextField,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import styles from "screens/ContactMe.module.css";
import { Formik } from "formik";
import * as yup from "yup";
import MuiAlert from "@material-ui/lab/Alert";

const ContactMe = ({ contactData, refs }) => {
  const [sendingForm, setSendingForm] = useState(false);
  const [successSnackbar, setShowSuccessSnackbar] = useState(false);
  const [errorSnackbar, setShowErrorSnackbar] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function submitForm(data, resetForm) {
    setSendingForm(true);
    var bodyFormData = new FormData();
    bodyFormData.append("completename", data.completeName);
    bodyFormData.append("email", data.email);
    bodyFormData.append("phone", data.phone);
    bodyFormData.append("message", data.message);

    axios({
      method: "post",
      url:
        process.env.API_BASE +
        "wp-json/contact-form-7/v1/contact-forms/128/feedback",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        //handle success
        if (response.data.status === "mail_sent") {
          setShowSuccessSnackbar(true);
          resetForm({});
        } else {
          setShowErrorSnackbar(true);
        }
        setSendingForm(false);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  }
  const phoneRegExp = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/;

  const validationSchema = yup.object({
    email: yup.string("Ajoutez votre email").email("Ajoutez un email valide"),
    phone: yup
      .string("Ajoutez votre téléphone")
      .matches(phoneRegExp, "Numéro de téléphone n'est pas valide")
      .required(
        "Un numéro de téléphone est obligatoire afin que je puisse vous recontacter"
      ),
    message: yup.string("Entre votre nom et prénom"),
    completeName: yup
      .string("Ajoutez votre nom et prénom")
      .required("Votre nom et/ou prénom doit être complété"),
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSuccessSnackbar(false)}
      >
        <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">
          Votre message a bien été envoyé
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowErrorSnackbar(false)}
      >
        <Alert onClose={() => setShowErrorSnackbar(false)} severity="error">
          Une erreur est survenue, le message n'a pas pu être envoyé
        </Alert>
      </Snackbar>
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
        alignItems="flex-start"
        justify="space-evenly"
        style={{ margin: "30px 0" }}
      >
        <Grid item xs={10} sm={5}>
          <Formik
            validateOnChange={true}
            validateOnMount={true}
            validateOnBlur={true}
            enableReinitialize={true}
            validationSchema={validationSchema}
            initialValues={{}}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              submitForm(values, resetForm);
              setSubmitting(false);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container spacing={3} justify="flex-end">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      onChange={props.handleChange}
                      variant="outlined"
                      name="completeName"
                      placeholder={contactData.acf.form.first_field}
                      value={props.values.completeName || ""}
                      error={
                        props.touched.completeName &&
                        Boolean(props.errors.completeName)
                      }
                      helperText={
                        props.touched.completeName && props.errors.completeName
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      onChange={props.handleChange}
                      value={props.values.email || ""}
                      fullWidth
                      variant="outlined"
                      name="email"
                      placeholder={contactData.acf.form.second_field}
                      error={props.touched.email && Boolean(props.errors.email)}
                      onBlur={props.onBlur}
                      helperText={props.touched.email && props.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      onChange={props.handleChange}
                      fullWidth
                      value={props.values.phone || ""}
                      variant="outlined"
                      name="phone"
                      placeholder={contactData.acf.form.third_field}
                      error={props.touched.phone && Boolean(props.errors.phone)}
                      helperText={props.touched.phone && props.errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      onChange={props.handleChange}
                      value={props.values.message || ""}
                      fullWidth
                      multiline
                      name="message"
                      rows={6}
                      variant="outlined"
                      placeholder={contactData.acf.form.fourth_field}
                      error={
                        props.touched.message && Boolean(props.errors.message)
                      }
                      helperText={props.touched.message && props.errors.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {sendingForm ? (
                      <CircularProgress style={{ float: "right" }} />
                    ) : (
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        type="submit"
                        color="primary"
                      >
                        {contactData.acf.form.btn_text}
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
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
