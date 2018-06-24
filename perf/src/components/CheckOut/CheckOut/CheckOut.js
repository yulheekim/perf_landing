import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import { injectStripe } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';

class CheckOutComponent extends Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
      return (
          <StripeCheckout
              token={this.onToken}
              stripeKey="pk_test_gP3gqSSBvypkudXyIkjx8xpB"
              shippingAddress
              billingAddress={true}
              zipCode={true}
          />
      );
  }
}

export const CheckOut = injectStripe(CheckOutComponent);

