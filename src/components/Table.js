import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { DATA_ATTRIBUTES } from "../utils/constants";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { THEME } from "../utils/theme";
import styled from "@emotion/styled";

const ErrorMessage = styled("p")({
  fontSize: "24px",
  color: THEME.MAIN.DARK
});

const ErrorWrapper = styled("div")({
  marginTop: "20px",
  textAlign: "center"
});

class Table extends Component {
  render() {
    const selectRow = {
      mode: "checkbox"
    };
    const cellEdit = {
      mode: "click",
      blurToSave: true
    };

    const data = this.props.data;

    let table;
    // Only Render the table when data exists
    if (data.length) {
      const headers = Object.keys(data[0]).map(header => (
        <TableHeaderColumn
          dataField={header}
          dataSort={true}
          thStyle={{ textAlign: "center" }}
          tdStyle={{ textAlign: "center" }}
        >
          {header}
        </TableHeaderColumn>
      ));

      table = (
        <div>
          <BootstrapTable
            keyField="Shipment ID"
            bordered={true}
            tableStyle={{
              background: THEME.MAIN.PRIMARY,
              color: THEME.MAIN.LIGHTEST
            }}
            headerStyle={{ background: THEME.MAIN.DARK, color: "white" }}
            bodyStyle={{ textAlign: "center" }}
            ref="table"
            data={data}
            selectRow={selectRow}
            cellEdit={cellEdit}
            deleteRow
            exportCSV
          >
            {headers}
          </BootstrapTable>
        </div>
      );
    } else {
      // Alter the user how to render
      table = (
        <ErrorWrapper>
          <ErrorMessage>No Data exists for the current selection.</ErrorMessage>
          <ErrorMessage>Select a shipment mode to add data.</ErrorMessage>
        </ErrorWrapper>
      );
    }

    return <div>{table}</div>;
  }
}

export default Table;
