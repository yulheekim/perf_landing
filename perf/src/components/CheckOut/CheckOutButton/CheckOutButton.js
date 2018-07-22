import React, { Component } from 'react';
import './styles.css';
import { injectStripe } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import APIConfig from '../../../config/api';

class CheckOutButtonComponent extends Component {
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
              stripeKey={APIConfig.stripe_key}
              shippingAddress
              billingAddress={true}
              zipCode={true}
              className="stripeButton"
          />
      );
  }
}

export const CheckOutButton = injectStripe(CheckOutButtonComponent);
