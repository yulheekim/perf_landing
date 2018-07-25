import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { Link, Redirect } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import SwipeableViews from 'react-swipeable-views';

import APIConfig from '../../config/api';
import {
    change_address1,
    change_address2,
    change_bottle,
    change_city,
    change_email,
    change_image,
    change_message,
    change_state,
    change_zipcode,
    toggle_modal,
} from '../../ducks/checkout';
import {
    CheckOutButton,
    Header,
} from '../../components';
import './styles.css';
import styles from './styles';
const {
    sampleButton,
    stateDropdown
} = styles


class CheckOutComponent extends Component {

    populateImgs = () => {
        return _.map(this.props.bottle_imgs[this.props.current_bottle_index], (item, index)=> {
            return (
                <img alt={item} onClick={() => this.props.change_image(index)} key={index}/>
            )
        });
    }

    handleMessageChange = (event) => {
        this.props.change_message(event.target.value);
    };

    writeMessage = () => {
        const char_length = this.props.message.length;
        const char_limit = APIConfig.gift_msg_char_limit;
        return (
            <div className={(this.props.recipient_relations > 0) ? "showMessage" :"hideMessage"}>
                <div>
                    Write a message for the gift ({char_limit} characters max):
                    <TextField
                        label="Write a message here"
                        value={this.props.message}
                        onChange={this.handleMessageChange}
                        margin="normal"
                        error = {(char_length >= char_limit) ? true : false}
                        fullWidth = {true}
                        inputProps={{ maxLength: char_limit}}
                        multiline= {true}
                    />
                </div>
                <div className={(char_length >= char_limit) ? "wordCountBad" : "wordCountGood"}>{char_length}/{char_limit}</div>
            </div>
        )
    };

    populateDescriptions = () => {
        return _.map(this.props.result_cards, (item, index)=> {
            return (
                <div className="description" key={index}>- {item['name']} : {item['description']}</div>
            )
        })
    };

    bottleMenuItems = () => {
        return _.map(this.props.bottle_types, (item, index) => {
            return (
                <MenuItem value={index} key={index}> {item} </MenuItem>
            )
        })
    };

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

    handleBottleChange = (event) => {
        this.props.change_bottle(event.target.value);
    };

    handleEmailChange = (event) => {
        this.props.change_email(event.target.value);
    };

    handleAddress1Change = (event) => {
        this.props.change_address1(event.target.value)
    }

    handleAddress2Change = (event) => {
        this.props.change_address2(event.target.value)
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

    render() {
        if (this.props.result_cards[0].name === "") {
            return (<Redirect to="quiz"/>)
        }
        return (
            <section id="checkout">
                <Header />
                <div className="leftBox">
                    <div className="imgContainer">
                        <SwipeableViews
                            index={this.props.img_opt}
                            onChangeIndex={this.props.change_image(this.props.img_opt)}
                            enableMouseEvents
                            className="swiper"
                        >
                            {this.populateImgs()}
                        </SwipeableViews>
                        <div className="otherImgs">
                            {this.populateImgs()}
                        </div>
                    </div>

                    {(window.innerWidth < 768) ?
                        <div className="selectContainer">
                            <Select
                                onChange={this.handleBottleChange}
                                value={this.props.current_bottle_index}
                                fullWidth={true}
                            >
                            {this.bottleMenuItems()}
                            </Select>
                        </div>:
                        <div className="perfumeInfo">
                            <div className="title">{this.props.result_title}</div>
                            {this.populateDescriptions()}
                        </div>
                    }
                </div>

                <div className="rightBox">
                    {(window.innerWidth < 768) ?
                        <div className="perfumeInfo">
                            <div className="title">{this.props.result_title}</div>
                            {this.populateDescriptions()}
                        </div>:
                        <div className="selectContainer">
                            <Select
                                onChange={this.handleBottleChange}
                                value={this.props.current_bottle_index}
                                fullWidth={true}
                            >
                            {this.bottleMenuItems()}
                            </Select>
                        </div>
                    }
                    {this.writeMessage()}
                    <div className="priceContainer">
                        <b>Order Summary</b><br/>
                        <table><tbody>
                            <tr><td>Item: </td><td>${this.props.prices[this.props.current_bottle_index].toFixed(2)}</td></tr>
                            <tr><td>Estimated Tax: </td><td>$0.00</td></tr>
                            <tr className="bordered"><td>Shipping & handling: </td><td>$0.00</td></tr>
                            <tr className="total"><td>Total: </td><td>${(this.props.prices[this.props.current_bottle_index]).toFixed(2)}</td></tr>
                        </tbody></table>
                    </div>
                    {(this.props.current_bottle_index === 0) ?
                        <div className="checkOutButton">
                            <Button variant="contained" color="primary" style={sampleButton} onClick={()=>this.props.toggle_modal()}>Get your sample now!</Button>
                            <Modal
                                open={this.props.isOpen}
                                onClose={this.props.toggle_modal}
                                center
                                classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
                            >
                                <h2>Contact and Shipping Information:</h2>
                                Your Email Address: <TextField required
                                    label="Email Address"
                                    value={this.props.email}
                                    onChange={this.handleEmailChange}
                                    margin="normal"
                                /><br/>
                                Address Line 1: <TextField required
                                    label="Address Line 1"
                                    value={this.props.address1}
                                    onChange={this.handleAddress1Change}
                                    margin="normal"
                                /><br/>
                                Address Line 2: <TextField
                                    label="Address Line 2"
                                    value={this.props.address2}
                                    onChange={this.handleAddress2Change}
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
                                <Link to="approve" className="submitButton">
                                    <Button variant="contained" color="primary" >Submit</Button>
                                </Link>
                            </Modal>
                        </div>
                        :
                        <div className="checkOutButton">
                            <StripeProvider apiKey={APIConfig.stripe_key}>
                                <Elements>
                                    <CheckOutButton />
                                </Elements>
                            </StripeProvider>
                        </div>
                    }
                </div>
            </section>
        );
    };
}

export { CheckOutComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz, checkout } = state;
    const { address1, address2, bottle_imgs, bottle_types, city, current_bottle_index, email, img_opt, isOpen, message, prices, state_abbrv, zipcode } = checkout;
    const { answers, result_cards, result_title, recipient_relations } = quiz;
    return {
        ...ownProps,
        address1,
        address2,
        answers,
        bottle_imgs,
        bottle_types,
        city,
        current_bottle_index,
        email,
        img_opt,
        isOpen,
        message,
        prices,
        recipient_relations,
        result_cards,
        result_title,
        state_abbrv,
        zipcode
    };
};

export const CheckOut = connect(mapStateToProps, {
    change_address1,
    change_address2,
    change_bottle,
    change_city,
    change_email,
    change_image,
    change_message,
    change_state,
    change_zipcode,
    toggle_modal,
})(CheckOutComponent);
