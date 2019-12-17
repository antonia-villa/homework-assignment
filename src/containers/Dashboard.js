import React, { Component } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import { SAMPLE_DATA } from "../static/data/sample-data";
import { makeStyles } from "@material-ui/core/styles";
import { DATA_ATTRIBUTES, ADMIN, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { uniq, keys, pickBy } from "lodash";

const useStyles = () =>
  makeStyles({
    dashboardWrapper: {
      display: "flex",
      flexDirection: "column"
    },
    dashboardContents: {
      display: "flex",
      flexDirection: "column",
      marginTop: "2em",
      padding: "14px"
    },
    statisticsWrapper: {
      marginTop: "20px",
      marinBottom: "20px"
    },
    tableWrapper: {
      marginTop: "16px"
    }
  });

const constructInitialState = props => {
  // Administrator view of all client
  let rawData = SAMPLE_DATA;
  // If logged in user is not the admin, permision the data view
  if (props.client !== ADMIN) {
    rawData = rawData.filter(
      entry => entry[DATA_ATTRIBUTES.CLIENT_NAME] === props.client
    );
  }

  // Set in data in local storage
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.DATA,
    JSON.stringify(Object.assign({}, [...rawData]))
  );
  // Set logged in state in local storage
  localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN, props.loggedIn);

  // Format display Data
  let displayData = [...rawData];
  displayData.forEach(item => delete item[DATA_ATTRIBUTES.CLIENT_NAME]);

  // Available modes
  let modes = {};
  uniq(displayData.map(item => item[DATA_ATTRIBUTES.MODE])).forEach(
    mode => (modes[mode] = true)
  );

  // Available statuses
  let statuses = {};
  uniq(displayData.map(item => item[DATA_ATTRIBUTES.STATUS])).forEach(
    status => (statuses[status] = true)
  );

  return {
    displayData,
    [DATA_ATTRIBUTES.MODE]: modes,
    [DATA_ATTRIBUTES.STATUS]: statuses
  };
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = constructInitialState(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filterName, filterOption) {
    // Update Filters
    let updateFilters = Object.assign({}, this.state[filterName]);
    updateFilters[filterOption] = !updateFilters[filterOption];

    // Update data get local storage
    let rawData = Object.values(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.DATA))
    );
    let updatedData = rawData.filter(dataItem =>
      keys(pickBy(updateFilters)).includes(dataItem[filterName])
    );

    this.setState({
      [filterName]: updateFilters,
      displayData: updatedData
    });
  }

  render() {
    const classes = useStyles();

    return (
      <div className={classes.dashboardWrapper}>
        <Header
          client={this.props.client}
          handleLogout={this.props.handleLogout}
        />
        <div className={classes.statisticsWrapper}>
          <Statistics
            data={this.state.displayData}
            modes={this.state[DATA_ATTRIBUTES.MODE]}
            handleFilter={this.handleFilter}
          />
        </div>
        <div className={classes.dashboardContents}>
          <div className={classes.tableWrapper}>
            <Table
              modes={this.state[DATA_ATTRIBUTES.MODE]}
              statuses={this.state[DATA_ATTRIBUTES.STATUS]}
              data={this.state.displayData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
