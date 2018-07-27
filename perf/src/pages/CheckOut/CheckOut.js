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
} from '../../ducks/checkout';
import {
    CheckOutButton,
    Header,
    SampleCheckOutButton,
} from '../../components';
import './styles.css';


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

    handleBottleChange = (event) => {
        this.props.change_bottle(event.target.value);
    };
    componentWillMount() {
        this.props.handle_order_response(0);
    }
    handlePromoChange = (event) => {
        this.props.change_promo(event.target.value);
    };
    adjustPrice () {
        return(
            <td>${this.props.found_email&&this.props.current_bottle_index===0 ?
                <span><s>{this.props.prices[this.props.current_bottle_index].toFixed(2)}</s> 0.00</span> :
                this.props.prices[this.props.current_bottle_index].toFixed(2)}
            </td>
        )
    }
    render() {
        const price = this.adjustPrice();
        if (this.props.result_cards[0].name === "") {
            return (<Redirect to="quiz"/>)
        }
        else if (this.props.order_id !== 0) {
            return (<Redirect to="thankyou"/>)
        }
        else if (this.props.error_message !== "") {
            return (<Redirect to="error"/>)
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
                            <tr><td>Item: </td>{price}</tr>
                            <tr><td>Estimated Tax: </td><td>$0.00</td></tr>
                            <tr className="bordered"><td>Shipping & handling: </td><td>$0.00</td></tr>
                            <tr className="total"><td>Total: </td>{price}</tr>
                        </tbody></table>
                        {this.props.current_bottle_index === 0 &&
                            <div>
                                Promo Code :<TextField
                                    label={this.props.found_email ? "PROMO APPLIED!":"Enter your email"}
                                    value={this.props.promo}
                                    onChange={this.handlePromoChange}
                                    margin="normal"
                                />
                            <Button variant="contained" onClick={()=>this.props.check_promo()} size='small'>OK</Button>
                            </div>
                        }
                    </div>
                    {(this.props.current_bottle_index === 0) ?
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
            </section>
        );
    };
}

export { CheckOutComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz, checkout } = state;
    const { bottle_imgs, bottle_types, current_bottle_index, error_message, img_opt, message, order_id, prices, promo, found_email } = checkout;
    const { answers, result_cards, result_title, recipient_relations } = quiz;
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
        recipient_relations,
        result_cards,
        result_title,
        found_email,
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
})(CheckOutComponent);
