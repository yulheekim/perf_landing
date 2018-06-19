import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class LandingComponent extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Perf</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export { LandingComponent };

const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps
    };
};

export const Landing = connect(mapStateToProps, {
})(LandingComponent);
