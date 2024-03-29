import React from "react";
import { THEME } from "../../utils/theme";
// Material UI Components
import { Checkbox, Typography, makeStyles } from "@material-ui/core";
// Material UI Icons
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

import { DATA_ATTRIBUTES } from "../../utils/constants";

const useStyles = makeStyles({
  filterWrapper: {
    display: "flex",
    flexDirection: "row",
    marginRight: "10px",
    alignItems: "center",
    minWidth: "180px",
    justifyContent: "flex-start",
    marginBottom: "4px"
  },
  header: {
    textAlign: "left",
    fontSize: "14px",
    textTransform: "uppercase",
    marginLeft: "10px"
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
  statusFilter: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "baseline"
  }
});

const Statuses = props => {
  const classes = useStyles();
  const { statuses, handleFilter } = props;
  let statusButtons = Object.keys(statuses).map((status, index) => (
    <div key={status} className={classes.filterWrapper}>
      <Checkbox
        size="small"
        color="default"
        checked={statuses[status]}
        key={index}
        style={{
          paddingLeft: 0,
          height: "26px",
          borderRadius: 0,
          padding: 0,
          color: THEME.SECONDARY.DARK
        }}
        icon={
          <RadioButtonUncheckedIcon
            key={status}
            style={{
              fontSize: 26,
              paddingRight: 0
            }}
          />
        }
        checkedIcon={
          <RadioButtonCheckedIcon
            key={status}
            style={{
              fontSize: 26,
              paddingRight: 0
            }}
          />
        }
        onChange={() => handleFilter(DATA_ATTRIBUTES.STATUS, status)}
      />
      <Typography key={status} className={classes.header}>
        {status}
      </Typography>
    </div>
  ));

  return (
    <div className={classes.statusFilter}>
      <div className={classes.title}>
        <p className={classes.titleText}>{DATA_ATTRIBUTES.STATUS}:</p>
      </div>
      {statusButtons}
    </div>
  );
};

export default Statuses;

// onChange={() => handleFilter(DATA_ATTRIBUTES.STATUS, status)}
