import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';


import APIConfig from '../../../config/api';
import {
    change_address1,
    change_city,
    change_email,
    change_state,
    change_zipcode,
    handle_order_error,
    handle_order_response,
    toggle_modal,
} from '../../../ducks/checkout';
import './styles.css';
import styles from './styles';
const {
    sampleButton,
    stateDropdown,
    sampleMobileButton,
} = styles


class SampleCheckOutButtonComponent extends Component {
    handleSubmit = () => {
        const paymenturl = `${APIConfig.apiroot}/order`;
        const shipping = {
          name: (this.props.recipient_name==="") ? this.props.taker_name : this.props.recipient_name,
          country: "US",
          zip: this.props.zipcode,
          state: this.props.state_abbrv,
          line1: this.props.address1,
          city: this.props.city,
          country_code: "US"
        }
        const billing = {
          name: this.props.taker_name,
          country: "US",
          zip: this.props.zipcode,
          state: this.props.state_abbrv,
          line1: this.props.address1,
          city: this.props.city,
          country_code: "US"
        }
        const sending_payment = {
          token_id: "",
          email: this.props.email,
          shipping,
          billing,
          price: 0, // need to get this from bottle
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

    stateMenuItems = () => {
        const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA',
        'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA',
        'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
        return _.map(states, (item, index) => {
            return (
                <MenuItem value={item} key={index}> {item} </MenuItem>
            )
        })
    };

    handleEmailChange = (event) => {
        this.props.change_email(event.target.value);
    };

    handleAddress1Change = (event) => {
        this.props.change_address1(event.target.value)
    }

    handleCityChange = (event) => {
        this.props.change_city(event.target.value)
    }

    handleStateChange = (event) => {
        this.props.change_state(event.target.value)
    }

    handleZipcodeChange = (event) => {
        this.props.change_zipcode(event.target.value)
    }
    toggleModal = () => {
        this.props.toggle_modal();
    };

    render() {
        return (
            <div className="checkOutButton">
                <Button variant="contained" color="primary" style={(window.innerWidth < 800 ? sampleMobileButton : sampleButton)} onClick={this.toggleModal}>Get your sample now!</Button>
                <Modal
                  open={this.props.open}
                  onClose={this.toggleModal}
                  center
                  classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
                >
                <h2>Contact and Shipping Information:</h2>
                Your Email Address: <TextField required
                  label="Email Address"
                  value={this.props.email}
                  onChange={this.handleEmailChange}
                  margin="normal"
                  autoFocus={true}
                /><br/>
                Address Line 1: <TextField required
                  label="Address Line 1"
                  value={this.props.address1}
                  onChange={this.handleAddress1Change}
                  margin="normal"
                /><br/>
                City: <TextField required
                  label="City"
                  value={this.props.city}
                  onChange={this.handleCityChange}
                  margin="normal"
                />
                State: <Select
                  onChange={this.handleStateChange}
                  value={this.props.state_abbrv}
                  style={stateDropdown}
                >
                {this.stateMenuItems()}
                </Select>
                Zipcode: <TextField required
                  label="Zipcode"
                  value={this.props.zipcode}
                  onChange={this.handleZipcodeChange}
                  margin="normal"
                /><br/>
                <Link to="thankyou" className="submitButton">
                    <Button variant="contained" color="primary" onClick={()=>this.handleSubmit()} disabled={this.props.address1==="" || this.props.city==="" || this.props.email==="" || this.props.state_abbrv==="" || this.props.zipcode===""}>Submit</Button>
                </Link>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { checkout, quiz } = state;
    const { address1, city, email, open, state_abbrv, zipcode, current_bottle_index,
        prices, amounts, types, message } = checkout;
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
        address1,
        city,
        email,
        open,
        state_abbrv,
        zipcode,
        current_bottle_index,
        prices,
        amounts,
        types,
        quizresult_id,
        message
    };
};

export const SampleCheckOutButton = connect(mapStateToProps, {
    change_address1,
    change_city,
    change_email,
    change_state,
    change_zipcode,
    handle_order_error,
    handle_order_response,
    toggle_modal,
})(SampleCheckOutButtonComponent);
