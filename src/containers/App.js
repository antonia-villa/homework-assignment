import React, { Component } from "react";
import Login from "../components/Login";
import Dashboard from "./Dashboard";
import { CLIENT_DATA } from "../utils/constants";

class App extends Component {
  state = {
    loggedIn: true, // user is not logged in
    client: "Broko"
  };

  render() {
    const handleSubmit = (client, password) => event => {
      event.preventDefault();
      // Temporary auth to filter client view
      if (password !== null) {
        this.setState({ client, loggedIn: true });
      }
    };

    // Log user out
    // Clear local storage
    const handleLogout = () => event => {
      localStorage.removeItem(CLIENT_DATA);
      this.setState({
        loggedIn: !this.state.loggedIn,
        client: ""
      });
    };

    return this.state.loggedIn ? (
      <Dashboard client={this.state.client} handleLogout={handleLogout} />
    ) : (
      <Login handleSubmit={handleSubmit} />
    );
  }
}

export default App;
