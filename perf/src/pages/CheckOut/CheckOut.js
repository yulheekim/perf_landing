import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import {StripeProvider, Elements} from 'react-stripe-elements';
import { CheckOutForm } from '../../components/CheckOut';


class CheckOutComponent extends Component {

  render() {
    return (
      <StripeProvider apiKey="pk_test_gP3gqSSBvypkudXyIkjx8xpB">
        <Elements>
          <CheckOutForm />
        </Elements>
      </StripeProvider>
    );
  }

}

export { CheckOutComponent };

const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps
    };
};

export const CheckOut = connect(mapStateToProps, {
})(CheckOutComponent);
