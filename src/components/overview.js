import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { THEME } from "../utils/theme";

const useStyles = () =>
  makeStyles({
    cardWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
      backgroundColor: THEME.LIGHTEST,
      margin: "10px",
      marginBottom: "20px",
      borderRadius: "4px",
      border: `${THEME.MAIN.DARK} solid 1px`
    }
  });

const Overview = props => {
  const classes = useStyles();
  const { client, data } = props;
  console.log("client", client);
  console.log("props", props);
  return <div className={classes.cardWrapper}> YAY</div>;
};

export default Overview;
