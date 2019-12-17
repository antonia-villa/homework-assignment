import React, { Component } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import { SAMPLE_DATA } from "../static/data/sample-data";
import styled from "@emotion/styled";
import { DATA_ATTRIBUTES, CLIENT_DATA } from "../utils/constants";
import { uniq, keys, pickBy } from "lodash";

const DashboardWrapper = styled("div")({
  display: "flex",
  flexDirection: "column"
});

const DashboardContents = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "2em",
  padding: "14px"
});

const StatisticsWrapper = styled("div")({
  marginTop: "20px",
  marinBottom: "20px"
});

const TableWrapper = styled("div")({
  marginTop: "16px"
});

const constructInitialState = props => {
  const rawData = SAMPLE_DATA.filter(
    entry => entry[DATA_ATTRIBUTES.CLIENT_NAME] === props.client
  );
  // Set in data in local storage
  localStorage.setItem(
    CLIENT_DATA,
    JSON.stringify(Object.assign({}, [...rawData]))
  );

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
    data: rawData,
    [DATA_ATTRIBUTES.MODE]: modes,
    [DATA_ATTRIBUTES.STATUS]: statuses
  };
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = constructInitialState(props);
    this.handleDataUpdate = this.handleDataUpdate.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filterName, filterOption) {
    console.log("filterName", filterName);
    console.log("filterOption", filterOption);
    // Update Filters

    let updateFilters = Object.assign({}, this.state[filterName]);
    updateFilters[filterOption] = !updateFilters[filterOption];

    // Update data
    let updatedData = this.state.data.filter(dataItem =>
      keys(pickBy(updateFilters)).includes(dataItem[filterName])
    );
    //
    this.setState({
      [filterName]: updateFilters,
      displayData: updatedData
    });
  }

  // Handle Data Update from Table
  handleDataUpdate(data) {
    this.setState({
      data: data
    });
  }

  render() {
    console.log("this.state", this.state);
    return (
      <DashboardWrapper>
        <Header
          client={this.props.client}
          handleLogout={this.props.handleLogout}
        />
        <StatisticsWrapper>
          <Statistics
            data={this.state.displayData}
            modes={this.state[DATA_ATTRIBUTES.MODE]}
            handleFilter={this.handleFilter}
          />
        </StatisticsWrapper>
        <DashboardContents>
          <TableWrapper>
            <Table
              modes={this.state[DATA_ATTRIBUTES.MODE]}
              statuses={this.state[DATA_ATTRIBUTES.STATUS]}
              data={this.state.displayData}
              handleDataUpdate={this.handleDataUpdate}
            />
          </TableWrapper>
        </DashboardContents>
      </DashboardWrapper>
    );
  }
}

export default Dashboard;
