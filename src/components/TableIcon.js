import React, { Component } from "react";
import PublicIcon from "@material-ui/icons/Public";

// Conditionally Render Symbol
class ModeIcon extends React.Component {
  render() {
    return (
      <div style={{ color: "rgb(255,153,0)" }}>
        <PublicIcon size={32} />
      </div>
    );
  }
}

export function ModeIconFormatter(cell, row) {
  return <ModeIcon active={cell} />;
}
