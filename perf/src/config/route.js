import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Landing,
  NoMatch,
  Quiz,
  CheckOut,
  QuizResult,
  ServerError,
} from '../pages';

const AppNavigator = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/checkout" component={CheckOut} />
        <Route exact path="/result" component={QuizResult} />
        <Route exact path="/error" component={ServerError} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
);

export { AppNavigator };
