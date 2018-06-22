import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Landing,
  NoMatch,
  CheckOut,
} from '../pages';

const AppNavigator = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/checkout" component={CheckOut} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
);

export { AppNavigator };
