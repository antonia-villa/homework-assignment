import React, { Component } from "react";
import Login from "../components/Login";
import Dashboard from "./Dashboard";

class App extends Component {
  state = {
    loggedIn: true,
    client: "Broko"
  };

  render() {
    const handleSubmit = (client, password) => event => {
      event.preventDefault();

      // Hack for auth to filter client specific data
      if (password !== null) {
        this.setState({
          client,
          loggedIn: true
        });
      }
    };

    // Log user out
    // Clear local storage
    const handleLogout = () => event => {
      localStorage.clear();
      this.setState({
        loggedIn: !this.state.loggedIn,
        client: ""
      });
    };

    return this.state.loggedIn ? (
      <Dashboard
        loggedIn={this.state.loggedIn}
        client={this.state.client}
        handleLogout={handleLogout}
      />
    ) : (
      <Login handleSubmit={handleSubmit} />
    );
  }
}

export default App;
