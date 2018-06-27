import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';

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
