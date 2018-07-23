import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  First,
  Header,
  Reviews,
  WhyPerf,
} from '../../components';
import styles from './styles';

const {
  landingStyle,
} = styles

class LandingComponent extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div style={landingStyle}>
        <Header />
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
