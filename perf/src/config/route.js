import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  NoMatch,
  Quiz,
  CheckOut,
  QuizResult,
  ServerError,
  ThankYou,
} from '../pages';

const AppNavigator = () => (
    <Router>
      <Switch>
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/checkout" component={CheckOut} />
        <Route exact path="/result" component={QuizResult} />
        <Route exact path="/error" component={ServerError} />
        <Route exact path="/thankyou" component={ThankYou} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
);

export { AppNavigator };
