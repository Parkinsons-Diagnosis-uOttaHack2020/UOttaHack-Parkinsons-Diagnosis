import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Test from "./components/test";
import Dashboard from "./components/dashboard/Dashboard";
import Nav from "./components/nav/Nav";

const RouterComponent = () => {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact render={props => <Landing {...props} />} />
            <Route path="/login" exact render={props => <Login {...props} />} />
            <Route
              path="/register"
              exact
              render={props => <Register {...props} />}
            />
            <Route
              path="/user/dashboard"
              exact
              render={props => <Dashboard {...props} />}
            />
            <Route
              path="/"
              render={() => (
                <React.Fragment>
                  <div>404</div>
                  <div>Page not found</div>
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default RouterComponent;
