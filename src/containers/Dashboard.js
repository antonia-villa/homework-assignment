import React, { Component } from "react";
import Table from "../components/table";
import NavBar from "../components/nav-bar";
import { SAMPLE_DATA } from "../static/data/sample-data";
import { makeStyles } from "@material-ui/core/styles";
import { DATA_ATTRIBUTES, ADMIN, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { THEME } from "../utils/theme";
import { uniq } from "lodash";
import Filters from "../components/Filters";

const useStyles = () =>
  makeStyles({
    dashboardWrapper: {
      display: "flex",
      flexDirection: "row",
      margin: "10px",
      minHeight: "750px"
    },
    dashboardContents: {
      display: "flex",
      flexDirection: "column",
      marginTop: "2em",
      padding: "14px"
    },
    filterWrapper: {
      marginTop: "20px",
      marinBottom: "20px"
    },
    tableWrapper: {
      marginTop: "24px",
      margin: "10px",
      border: `${THEME.MAIN.DARK} 1px solid`
    }
  });

const constructInitialState = props => {
  // Administrator view of all client
  let rawData = SAMPLE_DATA;
  // If logged in user is not the admin, permission the data view
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
  // Remove Client Field for client view
  if (props.client !== ADMIN) {
    displayData.forEach(item => delete item[DATA_ATTRIBUTES.CLIENT_NAME]);
  }
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
    // Fetch data from local storage
    let rawData = Object.values(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.DATA))
    );
    // Update filters based on selected filterName
    let updatedFilters = Object.assign({}, this.state[filterName]);
    updatedFilters[filterOption] = !updatedFilters[filterOption];
    // Update displayData
    let validFilters = Object.keys(updatedFilters).filter(
      item => updatedFilters[item]
    );
    let updatedData = rawData.reduce((data, dataItem) => {
      if (validFilters.includes(dataItem[filterName])) {
        data.push(dataItem);
      }
      return data;
    }, []);

    // Update Data from persisted filters
    let persistedFilterName = [
      DATA_ATTRIBUTES.MODE,
      DATA_ATTRIBUTES.STATUS
    ].filter(item => item !== filterName);

    let persistedFilters = Object.keys(this.state[persistedFilterName]).filter(
      item => this.state[persistedFilterName][item]
    );
    let returnData = updatedData.reduce((data, dataItem) => {
      if (persistedFilters.includes(dataItem[persistedFilterName])) {
        data.push(dataItem);
      }
      return data;
    }, []);

    this.setState({
      [filterName]: updatedFilters,
      displayData: returnData
    });
  }

  render() {
    const classes = useStyles();

    return (
      <div>
        <div className={classes.dashboardWrapper}>
          <NavBar
            client={this.props.client}
            handleLogout={this.props.handleLogout}
          />
          <div className={classes.test}>
            <div className={classes.filterWrapper}>
              <Filters
                statuses={this.state[DATA_ATTRIBUTES.STATUS]}
                modes={this.state[DATA_ATTRIBUTES.MODE]}
                handleFilter={this.handleFilter}
              />
            </div>
            <hr
              style={{
                color: THEME.LIGHTEST,
                backgroundColor: THEME.LIGHTEST,
                height: 2,
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "20px",
                marginTop: "20px"
              }}
            />
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
        </div>
      </div>
    );
  }
}

export default Dashboard;
