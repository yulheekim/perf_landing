import React, { Component } from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class NoMatchComponent extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">No such endpoint exists</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export { NoMatchComponent };

const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps
    };
};

export const NoMatch = connect(mapStateToProps, {
})(NoMatchComponent);
