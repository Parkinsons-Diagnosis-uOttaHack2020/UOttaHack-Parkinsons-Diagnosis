import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./components/test";

const RouterComponent = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Test {...props}/>}
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
      </Router>
    </React.Fragment>
  );
};

export default RouterComponent;
