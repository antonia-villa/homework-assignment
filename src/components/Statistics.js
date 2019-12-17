import React from "react";

import { DATA_ATTRIBUTES, TOTAL } from "../utils/constants";
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
import PublicIcon from "@material-ui/icons/Public";

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
    textAlign: "center"
  },
  header: {
    fontSize: "18px",
    marginBottom: "4px"
  },
  icon: {
    marginBotton: "4px",
    fontSize: "28px"
  },
  body: {
    fontSize: "20px"
  },
  media: {
    height: 140
  }
});

const MODES = {
  AIR: "Air",
  RAIL: "Rail",
  SEA: "Sea"
};

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

  let totalCard = (
    <Card key={TOTAL} className={classes.totalCard} raised={true}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.header}>Total:</Typography>
        <PublicIcon className={classes.icon} />
        <Typography className={classes.body}>{props.data.length}</Typography>
      </CardContent>
    </Card>
  );

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
      {totalCard}
      <div>
        <div className={classes.title}>Filter By:</div>
        {modeCards}
      </div>
    </div>
  );
};

export default Statistics;
