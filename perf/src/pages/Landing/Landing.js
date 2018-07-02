import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { CheckOut } from '../../components/CheckOut';
import APIConfig from '../../config/api';

class LandingComponent extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Perf</h1>
        </header>
        <StripeProvider apiKey={APIConfig.stripe_key}>
          <Elements>
            <CheckOut />
          </Elements>
        </StripeProvider>


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
