import React from "react";

import { DATA_ATTRIBUTES, MODES } from "../../utils/constants";
import { THEME } from "../../utils/theme";
// Material-ui Elements
import { Typography, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Material-ui Icons
import FlightIcon from "@material-ui/icons/Flight";
import TrainIcon from "@material-ui/icons/Train";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles({
  filterWrapper: {
    display: "flex",
    flexDirection: "row",
    marginRight: "10px",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    minWidth: 100,
    fontSize: "16px"
  },
  titleText: {
    textTransform: "uppercase",
    marginBottom: 0,
    fontWeight: 600,
    color: THEME.MAIN.DARK
  },
  activeCard: {
    margin: 0,
    padding: 10,
    color: THEME.MAIN.DARK,
    minWidth: "40px",
    minHeight: "40px",
    paddingRight: 0
  },
  inactiveCard: {
    margin: 0,
    padding: 10,
    color: THEME.MAIN.PRIMARY,
    minWidth: "40px",
    minHeight: "40px",
    paddingRight: 0
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0
  },
  header: {
    fontSize: "16px",
    textTransform: "uppercase",
    marginRight: "10px"
  },
  icon: {
    marginBotton: "4px",
    fontSize: "20px",
    marginRight: "10px"
  },
  modesFilter: {
    marginRight: "20px"
  }
});

const Modes = props => {
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

  let modeCards = Object.keys(modes).map((mode, index) => (
    <div className={classes.filterWrapper} key={index}>
      <Checkbox
        size="small"
        color="default"
        checked={modes[mode]}
        key={index}
        style={{
          paddingLeft: 0,
          height: "26px",
          borderRadius: 0,
          padding: 0
        }}
        icon={
          <CheckBoxOutlineBlankIcon
            key={index}
            style={{
              fontSize: 26,
              paddingRight: 0
            }}
          />
        }
        checkedIcon={
          <CheckBoxIcon
            key={index}
            style={{
              fontSize: 26,
              paddingRight: 0,
              color: THEME.LIGHTEST,
              backgroundColor: THEME.SECONDARY.DARK
            }}
          />
        }
        onChange={() => handleFilter(DATA_ATTRIBUTES.MODE, mode)}
      />
      <div className={modes[mode] ? classes.activeCard : classes.inactiveCard}>
        <div className={classes.cardContent}>
          <Typography key={index} className={classes.header}>
            {mode}
          </Typography>
          {getCardIcon(mode)}
        </div>
      </div>
    </div>
  ));

  return (
    <div className={classes.modesFilter}>
      <div className={classes.title}>
        <p className={classes.titleText}>{DATA_ATTRIBUTES.MODE}:</p>
      </div>
      {modeCards}
    </div>
  );
};

export default Modes;
