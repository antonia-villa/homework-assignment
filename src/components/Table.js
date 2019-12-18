import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { THEME } from "../utils/theme";
import { makeStyles } from "@material-ui/core/styles";
// Material-ui Icons
import FlightIcon from "@material-ui/icons/Flight";
import TrainIcon from "@material-ui/icons/Train";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import { DATA_ATTRIBUTES, MODES } from "../utils/constants";

// Conditionally Render Mode Symbol
class ModeIcon extends React.Component {
  render() {
    let icon;
    if (this.props.active === MODES.RAIL) {
      icon = <TrainIcon />;
    } else if (this.props.active === MODES.AIR) {
      icon = <FlightIcon />;
    } else if (this.props.active === MODES.SEA) {
      icon = <DirectionsBoatIcon />;
    }
    return <div>{icon}</div>;
  }
}
// Mode Icon Formatter
function modeIconFormatter(cell, row) {
  return <ModeIcon active={cell} />;
}

const useStyles = () =>
  makeStyles({
    errorMessage: { fontSize: "28px", color: THEME.MAIN.DARK },
    errorWrapper: {
      marginTop: "20px",
      textAlign: "center"
    },
    tableWrapper: {
      marginTop: "24px",
      margin: "10px",
      border: `${THEME.MAIN.DARK} 1px solid`
    },
    searchField: {
      marginRight: "10px"
    }
  });

class Table extends Component {
  render() {
    const classes = useStyles();

    let table;

    const assignHeaderFormat = header => {
      if (header === DATA_ATTRIBUTES.MODE) {
        return (
          <TableHeaderColumn
            dataField={header}
            dataSort={true}
            key={header}
            thStyle={{ textAlign: "center" }}
            tdStyle={{
              textAlign: "center",
              border: `${THEME.LIGHTEST} 1px solid`
            }}
            dataFormat={modeIconFormatter}
          >
            {header}
          </TableHeaderColumn>
        );
      } else {
        return (
          <TableHeaderColumn
            dataField={header}
            dataSort={true}
            key={header}
            thStyle={{ textAlign: "left" }}
            tdStyle={{
              textAlign: "left",
              border: `${THEME.LIGHTEST} 1px solid`
            }}
          >
            {header}
          </TableHeaderColumn>
        );
      }
    };

    // Only Render the table when data exists
    if (this.props.data.length) {
      const headers = Object.keys(this.props.data[0]).map(header =>
        assignHeaderFormat(header)
      );

      table = (
        <div>
          <BootstrapTable
            keyField="Shipment ID"
            bordered={true}
            tableStyle={{
              background: THEME.LIGHT,
              color: THEME.MAIN.LIGHTEST,
              margin: "10px"
            }}
            headerStyle={{ background: THEME.MAIN.DARK, color: "white" }}
            bodyStyle={{ textAlign: "left" }}
            ref="table"
            data={this.props.data}
            search={true}
            multiColumnSearch={true}
          >
            {headers}
          </BootstrapTable>
        </div>
      );
    } else {
      // Alter the user how to render
      table = (
        <div className={classes.errorWrapper}>
          <p className={classes.errorMessage}>
            No Data exists for the current selection.
          </p>
          <p className={classes.errorMessage}>
            Select a shipment mode to add data.
          </p>
        </div>
      );
    }

    return <div className={classes.tableWrapper}>{table}</div>;
  }
}

export default Table;
