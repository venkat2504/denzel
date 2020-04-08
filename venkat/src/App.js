import React, { Component } from "react";
import Movies from "./components/moives";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Movies />
      </div>
    );
  }
}

export default App;
