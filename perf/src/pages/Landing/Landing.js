import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Link } from 'react-router-dom';

import { CheckOut } from '../../components/CheckOut';
import { 
  Header,
  ScrollDown,
} from '../../components/Common';
import APIConfig from '../../config/api';
import styles from './styles';

const {
  landingStyle,
  sectionStyle,
  onelinerStyle,
  quizLinkStyle,
  quizButtonStyle,
} = styles

class LandingComponent extends Component {

  render() {
    return (
      <div style={landingStyle}>
        <section id="first" style={sectionStyle}>
          <Header />
          <div style={onelinerStyle}>
            Personalized Fragrance Designed by You
          </div>

          <Link style={quizLinkStyle} to="quiz" >
            <Button style={quizButtonStyle} variant="contained" size="large">
              Get Started!
            </Button>
          </Link>

          <ScrollDown message={"Learn More"} moveto={"whyperf"} />

        </section>

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
      ...ownProps
    };
};

export const Landing = connect(mapStateToProps, {
})(LandingComponent);
