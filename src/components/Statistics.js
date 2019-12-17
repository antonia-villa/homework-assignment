import React from "react";

import { DATA_ATTRIBUTES, MODES } from "../utils/constants";
import { THEME } from "../utils/theme";
// Material-ui Elements
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
// Material-ui Icons
import FlightIcon from "@material-ui/icons/Flight";
import TrainIcon from "@material-ui/icons/Train";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";

const useStyles = makeStyles({
  cardWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "8px",
    paddingRight: "8px"
  },
  title: {
    minWidth: 100,
    fontSize: "20px"
  },
  activeCard: {
    minWidth: 150,
    margin: 10,
    backgroundColor: THEME.MAIN.PRIMARY,
    color: "white"
  },
  totalCard: {
    minWidth: 100,
    margin: 10,
    backgroundColor: THEME.HIGHLIGHT.PRIMARY,
    color: "white"
  },
  inactiveCard: {
    minWidth: 150,
    margin: 10,
    backgroundColor: THEME.LIGHTEST,
    color: THEME.MAIN.DARK
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: "20px",
    marginRight: "10px"
  },
  icon: {
    marginBotton: "4px",
    fontSize: "34px",
    marginRight: "10px"
  },
  body: {
    fontSize: "20px"
  },
  media: {
    height: 140
  }
});

const Statistics = props => {
  const classes = useStyles();
  const { modes, handleFilter } = props;

  const getCardIcon = mode => {
    let icon;
    switch (mode) {
      case MODES.AIR:
        icon = <FlightIcon className={classes.icon} />;
        break;
      case MODES.RAIL:
        icon = <TrainIcon className={classes.icon} />;
        break;
      case MODES.SEA:
        icon = <DirectionsBoatIcon className={classes.icon} />;
        break;
      default:
        return null;
    }
    return icon;
  };

  let modeCards = Object.keys(modes).map(mode => (
    <Card
      key={mode}
      className={modes[mode] ? classes.activeCard : classes.inactiveCard}
      raised={true}
      onClick={() => handleFilter(DATA_ATTRIBUTES.MODE, mode)}
    >
      <CardActionArea className={classes.cardAction}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.header}>{mode}</Typography>
          {getCardIcon(mode)}
          <Typography className={classes.body}>
            {
              props.data.filter(item => item[DATA_ATTRIBUTES.MODE] === mode)
                .length
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.title}>Filter By:</div>
      {modeCards}
    </div>
  );
};

export default Statistics;
