import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  WhyPerf,
  First,
  Reviews,
} from '../../components';

import styles from './styles';

const {
  landingStyle,
} = styles

class LandingComponent extends Component {

  render() {
    return (
      <div style={landingStyle}>
        <First />
        <WhyPerf />
        <Reviews />
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
