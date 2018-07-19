import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Landing,
  ChooseQuiz,
  NoMatch,
  Quiz,
  QuizResult,
} from '../pages';

const AppNavigator = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/choose" component={ChooseQuiz} />
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/result" component={QuizResult} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
);

export { AppNavigator };
