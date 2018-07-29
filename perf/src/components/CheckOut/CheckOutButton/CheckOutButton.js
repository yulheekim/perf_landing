import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { injectStripe } from 'react-stripe-elements';

import APIConfig from '../../../config/api';
import {
    handle_order_error,
    handle_order_response,
} from '../../../ducks/checkout';
import './styles.css';
class CheckOutButtonComponent extends Component {
  onToken = (token, args) => {
      const paymenturl = `${APIConfig.apiroot}/order`;
      const shipping = {
        name: args.shipping_name,
        country: args.shipping_address_country,
        zip: args.shipping_address_zip,
        state: args.shipping_address_state,
        line1: args.shipping_address_line1,
        city: args.shipping_address_city,
        country_code: args.shipping_address_country_code
      }
      const billing = {
        name: args.billing_name,
        country: args.billing_address_country,
        zip: args.billing_address_zip,
        state: args.billing_address_state,
        line1: args.billing_address_line1,
        city: args.billing_address_city,
        country_code: args.billing_address_country_code
      }
      const sending_payment = {
        token_id: token.id,
        email: token.email,
        shipping,
        billing,
        price: (this.props.prices[this.props.current_bottle_index]) * 100, // need to get this from bottle
      }
      const sending_order = {
        name: this.props.taker_name,
        recipient_name: this.props.recipient_name,
        recipient_relations: this.props.recipient_options[this.props.recipient_relations],
        collection_title: this.props.result_title,
        amount: this.props.amounts[this.props.current_bottle_index], // need to get this from bottle
        sexuality: this.props.sexuality, // int 0 being masc and 5 being feminine
        message: this.props.message,
        bottle_type: this.props.types[this.props.current_bottle_index],
        result_metadata: {
          primary: {
            name: this.props.result_cards[0].name,
            desc: this.props.result_cards[0].description,
            accord: this.props.result_cards[0].accord,
          },
          secondary: {
            name: this.props.result_cards[1].name,
            desc: this.props.result_cards[1].description,
            accord: this.props.result_cards[1].accord,
          },
          tertiary: {
            name: this.props.result_cards[2].name,
            desc: this.props.result_cards[2].description,
            accord: this.props.result_cards[2].accord,
          },
          quiz_result_id: this.props.quizresult_id
        },
      }
      axios.post(paymenturl, {
        payment: sending_payment,
        order: sending_order
      })
        .then((response) => {
            this.props.handle_order_response(response.data.order_id);
        })
        .catch((error) => {
            this.props.handle_order_error("Error making payment");
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
  const { checkout, quiz } = state;
  const { current_bottle_index, prices, amounts, types, message } = checkout;
  const { taker_name, recipient_name, result_title, result_cards,
    recipient_relations, sexuality, recipient_options, quizresult_id } = quiz;
  return {
    ...ownProps,
    taker_name,
    recipient_name,
    recipient_options,
    recipient_relations,
    result_title,
    result_cards,
    sexuality,
    current_bottle_index,
    prices,
    amounts,
    types,
    quizresult_id,
    message,
  };
};

export const CheckOutButton = injectStripe(connect(mapStateToProps, {
    handle_order_error,
    handle_order_response,
})(CheckOutButtonComponent));
