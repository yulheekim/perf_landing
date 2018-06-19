import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Landing,
  NoMatch,
} from '../pages';

const AppNavigator = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
);


export { AppNavigator };

