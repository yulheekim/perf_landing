import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import SwipeableViews from 'react-swipeable-views';

import APIConfig from '../../config/api';
import {
    change_address1,
    change_bottle,
    change_city,
    change_email,
    change_image,
    change_message,
    change_promo,
    change_state,
    change_zipcode,
    check_promo,
    handle_order_response,
    load_bottles,
    reset_checkout,
} from '../../ducks/checkout';
import {
    ScrollDown,
} from '../../components/Common';
import {
    CheckOutButton,
    Header,
    SampleCheckOutButton,
} from '../../components';
import './styles.css';
import styles from './styles';
const { promoText, promoButton} = styles


class CheckOutComponent extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.load_bottles();
    }

    componentWillUnmount() {
        this.props.reset_checkout();
    }

    populateImgs = () => {
        return _.map(this.props.bottle_imgs[this.props.current_bottle_index], (item, index)=> {
            return (
                <img src={item} onClick={() => this.props.change_image(index)} key={index} alt="bottle"/>
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
            <div className="showMessage">
                <div>
                    Write a message to <i>{this.props.recipient_relations === 0 ? "yourself " : this.props.recipient_options[this.props.recipient_relations]}</i> ({char_limit} characters max):
                    <TextField
                        label="Write a message here"
                        value={this.props.message}
                        onChange={this.handleMessageChange}
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
                <div className="description" key={index}> - {item['name']} : {item['description'][1]}</div>
            )
        })
    };

    bottleMenuItems = () => {
        return _.map(this.props.bottle_types, (item, index) => {
            return (
                <MenuItem value={index} key={index}> {item} (${this.props.prices[index]}) </MenuItem>
            )
        })
    };

    handleBottleChange = (event) => {
        this.props.change_bottle(event.target.value);
    };
    componentWillMount() {
        this.props.handle_order_response(0);
    }
    handlePromoChange = (event) => {
        this.props.change_promo(event.target.value);
    };

    render() {
        if (this.props.quizresult_id < 1) {
            return (<Redirect to="quiz"/>)
        }
        else if (this.props.order_id !== 0) {
            return (<Redirect to="thankyou"/>)
        }
        else if (this.props.error_message) {
            return (<Redirect to="error"/>)
        }
        return (
            <div id="checkoutBody">
                <section id="select">
                    <Header />
                    <div className="boxes">
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
                        </div>

                        <div className="rightBox">
                            {(window.innerWidth < 768) ?
                                <div className="selectContainer">
                                    <b>Size:</b>&nbsp;&nbsp;
                                    <Select
                                        onChange={this.handleBottleChange}
                                        value={this.props.current_bottle_index}
                                        fullWidth={true}
                                        style={{'fontFamily':'Lora',}}
                                    >
                                    {this.bottleMenuItems()}
                                    </Select>
                                </div>:
                                <div className="perfumeInfo">
                                    <div className="title">{this.props.result_title}</div>
                                    {this.populateDescriptions()}
                                </div>
                            }
                            {(window.innerWidth >= 768) &&
                                <div className="selectContainer">
                                    <b>Size:</b>&nbsp;&nbsp;
                                    <Select
                                        onChange={this.handleBottleChange}
                                        value={this.props.current_bottle_index}
                                        fullWidth={true}
                                        style={{'fontFamily':'Lora',}}
                                    >
                                    {this.bottleMenuItems()}
                                    </Select>
                                </div>
                            }
                            <div className="priceContainer">
                                <b>Price:</b>&nbsp;&nbsp;${this.props.prices[this.props.current_bottle_index].toFixed(2)}&nbsp;&nbsp;
                                {(this.props.current_bottle_index === 0) ?
                                    "(FREE to subscriptors)" : "+ Shipping Fee"}
                            </div>
                        </div>
                    </div>
                    <ScrollDown message="Order Here" moveto="checkout" />
                </section>

                <section id="checkout">
                    <div className="boxes">
                        <div className="leftBox">
                            {(window.innerWidth >= 768) ?
                                <div className="perfumeInfo">
                                    <div className="itemInfo">
                                        <div className="title">{this.props.result_title}</div>
                                        <div className="description">Item: {this.props.bottle_types[this.props.current_bottle_index]}</div>
                                    </div>
                                    <div className="selectedBotImg">
                                        <img src={this.props.bottle_imgs[this.props.current_bottle_index][0]} alt={this.props.current_bottle_index} />
                                    </div>
                                </div>
                                :<div className="perfumeInfo">
                                    <div className="selectedBotImg">
                                        <img src={this.props.bottle_imgs[this.props.current_bottle_index][0]} alt={this.props.current_bottle_index} />
                                    </div>
                                    <div className="itemInfo">
                                        <div className="title">{this.props.result_title}</div>
                                        <div className="description">Item: {this.props.bottle_types[this.props.current_bottle_index]}</div>
                                    </div>
                                </div>
                            }
                            {this.writeMessage()}
                        </div>

                        <div className="rightBox">
                            <div className="orderSummary">
                                <div className="description"><b>Order Summary</b></div><br/>
                                <table><tbody>
                                    <tr><td>Item: </td>${this.props.prices[this.props.current_bottle_index].toFixed(2)}</tr>
                                    <tr><td>Tax: </td><td>${(this.props.prices[this.props.current_bottle_index]*0.1).toFixed(2)}</td></tr>
                                    <tr className="bordered"><td>Shipping & handling: </td><td>${this.props.shipping[this.props.current_bottle_index].toFixed(2)}</td></tr>
                                    <tr className="total"><td><b>Total: </b></td><b>
                                        <td>${this.props.found_email && this.props.current_bottle_index===0 ?
                                        <span> <s>{(this.props.prices[this.props.current_bottle_index]*1.1+this.props.shipping[this.props.current_bottle_index]).toFixed(2)}</s> 0.00 Promo Applied</span> :
                                        (this.props.prices[this.props.current_bottle_index]*1.1+this.props.shipping[this.props.current_bottle_index]).toFixed(2)}
                                    </td></b></tr>
                                </tbody></table>
                                {this.props.current_bottle_index === 0 &&
                                    <div className="promoContainer">
                                        Promo Code :&nbsp;<TextField
                                            label={this.props.found_email ? "PROMO APPLIED!":"Enter your email"}
                                            value={this.props.promo}
                                            onChange={this.handlePromoChange}
                                            style={promoText}
                                            onKeyPress={(ev) => {
                                                if (ev.key === 'Enter') {
                                                    this.props.check_promo();
                                                    ev.preventDefault();
                                                }
                                            }}
                                        />&nbsp;
                                    <Button variant="contained" onClick={()=>this.props.check_promo()} size='small' style={promoButton}>OK</Button>
                                    </div>
                                }
                            </div>
                            {(this.props.current_bottle_index === 0 && this.props.found_email) ?
                                <SampleCheckOutButton />
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
                    </div>
                </section>
            </div>
        );
    };
}

export { CheckOutComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz, checkout } = state;
    const { bottle_imgs, bottle_types, current_bottle_index, error_message, img_opt, message, order_id, prices, promo, found_email, shipping } = checkout;
    const { answers, result_cards, result_title, recipient_options, recipient_relations, quizresult_id } = quiz;
    return {
        ...ownProps,
        answers,
        bottle_imgs,
        bottle_types,
        current_bottle_index,
        error_message,
        img_opt,
        message,
        order_id,
        prices,
        promo,
        recipient_options,
        recipient_relations,
        result_cards,
        result_title,
        found_email,
        shipping,
        quizresult_id,
    };
};

export const CheckOut = connect(mapStateToProps, {
    change_address1,
    change_bottle,
    change_city,
    change_email,
    change_image,
    change_message,
    change_promo,
    change_state,
    change_zipcode,
    check_promo,
    handle_order_response,
    load_bottles,
    reset_checkout,
})(CheckOutComponent);
