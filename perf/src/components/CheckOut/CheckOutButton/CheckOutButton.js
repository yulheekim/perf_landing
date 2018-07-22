import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { injectStripe } from 'react-stripe-elements';

import APIConfig from '../../../config/api';
import './styles.css';
class CheckOutButtonComponent extends Component {
  onToken = (token, args) => {
    const paymenturl = `${APIConfig.apiroot}/payment`;
    const shipping = {
      name: args.shipping_name,
      address_country: args.shipping_address_country,
      address_zip: args.shipping_address_zip,
      address_state: args.shipping_address_state,
      address_line1: args.shipping_address_line1,
      address_city: args.shipping_address_city,
      address_country_code: args.shipping_address_country_code
    }
    const billing = {
      name: args.billing_name,
      address_country: args.billing_address_country,
      address_zip: args.billing_address_zip,
      address_state: args.billing_address_state,
      address_line1: args.billing_address_line1,
      address_city: args.billing_address_city,
      address_country_code: args.billing_address_country_code
    }
    const sending = {
      token,
      token_id: token.id,
      email: token.email,
      shipping,
      billing,
      taker_name: this.props.taker_name,
      recipient_name: this.props.recipient_name,
      recipient_relations: this.props.recipient_options[this.props.recipient_relations],
      result_title: this.props.result_title,
      result_cards: this.props.result_cards,
      amount: this.props.amount,
      sexuality: this.props.sexuality,
      message: this.props.message,
    }
    axios.post(paymenturl, {
      ...sending,
    })
      .then((response) => {
        console.log("Ahung gimothi");
      })
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

const mapStateToProps = (state, ownProps) => {
  const { quiz } = state;
  const { taker_name, recipient_name, result_title, result_cards, 
    recipient_relations, sexuality, message, recipient_options, amount } = quiz;
  return {
    ...ownProps,
    taker_name,
    recipient_name,
    recipient_options,
    recipient_relations,
    result_title,
    result_cards,
    amount,
    sexuality,
    message,
  };
};

export const CheckOutButton = injectStripe(connect(mapStateToProps, {
})(CheckOutButtonComponent));
