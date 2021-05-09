import React from "react";
import { Grid, Typography, Avatar, Button } from "@material-ui/core";
import parse from "html-react-parser";
import styles from "screens/Pricing.module.css";

const Pricing = ({ pricingData, refs }) => {
  return (
    <div
      style={{ margin: "150px 0" }}
      ref={(el) => (refs.current["pricing"] = el)}
    >
      <Typography variant="h3" align="center" style={{ margin: "85px 0" }}>
        {pricingData.acf.title}
      </Typography>
      <Grid container alignItems="flex-start" justify="center">
        {pricingData.acf.repeater.map((card, index) => (
          <Grid
            item
            xs={11}
            sm={4}
            style={{ padding: "0 10px", margin: "15px 0" }}
          >
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{
                boxShadow:
                  "0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)",
                height: "100%",
              }}
            >
              <Grid
                item
                xs={12}
                style={{
                  backgroundColor: "#46bae2",
                  color: "white",
                  padding: "25px",
                }}
              >
                <Typography
                  variant="h4"
                  align="center"
                  style={{ color: "white" }}
                >
                  {card.group.title}
                </Typography>
              </Grid>
              {card.group.lines.map((line, index) => (
                <Grid item xs={12} style={{ padding: "35px 15px" }}>
                  <Typography style={{ color: "#7a7a7a" }} align="center">
                    {parse(line.line)}
                  </Typography>
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                style={{ textAlign: "center", margin: "20px auto 35px" }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    refs.current.contactMe.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  {card.group.btn_text}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Pricing;
