import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Landing
} from '../pages';

const AppNavigator = () => (
    <Router>
      <Route exact path="/" component={Landing} />
    </Router>
);


export { AppNavigator };

