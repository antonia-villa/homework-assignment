import React from "react";
import { THEME } from "../../utils/theme";
import Modes from "./modes";
import Statuses from "./statuses";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
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
  },
  title: {
    minWidth: 100,
    fontSize: "20px",
    marginRight: "10px",
    display: "flex",
    flexGrow: 1,
    alignSelf: "baseline"
  },
  titleText: {
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  filterTypes: {
    display: "flex",
    flexDirection: "row"
  }
});

const Filters = props => {
  const classes = useStyles();
  const { modes, statuses, handleFilter } = props;

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.title}>
        <p className={classes.titleText}>FILTER BY:</p>
      </div>
      <div className={classes.filterTypes}>
        <Modes modes={modes} handleFilter={handleFilter} />
        <Statuses statuses={statuses} handleFilter={handleFilter} />
      </div>
    </div>
  );
};

export default Filters;
