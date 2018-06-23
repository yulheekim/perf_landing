import React, { Component } from 'react';
import './styles.css';
import { injectStripe, CardElement } from 'react-stripe-elements';


class CheckOutFormComponent extends Component {
    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe
            .createToken()
            .then((payload) => console.log('[token]', payload));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <CardElement />
            <button>Confirm order</button>
        </form>
    );
  }

}

export const CheckOutForm = injectStripe(CheckOutFormComponent);
