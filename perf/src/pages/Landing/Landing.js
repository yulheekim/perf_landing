import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';

import {
  CheckOut,
  WhyPerf,
  First,
  Reviews,
} from '../../components';

import APIConfig from '../../config/api';
import styles from './styles';

const {
  landingStyle,
  sectionStyle
} = styles

class LandingComponent extends Component {

  render() {
    return (
      <div style={landingStyle}>
        <First />
        <WhyPerf />
        <Reviews />
        <section id="whyperf" style={sectionStyle}>
          <StripeProvider apiKey={APIConfig.stripe_key}>
            <Elements>
              <CheckOut />
            </Elements>
          </StripeProvider>
        </section>
      </div>
    );
  }
}

export { LandingComponent };

const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps,
    };
};

export const Landing = connect(mapStateToProps, {
})(LandingComponent);
