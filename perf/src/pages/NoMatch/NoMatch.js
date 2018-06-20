import React, { Component } from 'react';
import logo from '../../logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class NoMatchComponent extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">404. No such endpoint exists.</h1>
        </header>
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
