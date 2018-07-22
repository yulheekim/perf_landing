import APIConfig from '../../config/api';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';
import React, { Component } from 'react';
import _ from 'lodash';

import {
    change_bottle,
    change_image,
    change_message,
} from '../../ducks/quiz';
import {
    CheckOutButton,
    Header,
} from '../../components';
import './styles.css';
import styles from './styles';
const {
    bottleButton,
} = styles


class CheckOutComponent extends Component {

    populateImgs = () => {
        return _.map(this.props.bottle_imgs[this.props.bottle_opt], (item, index)=> {
            return (
                <img alt={item} onClick={() => this.props.change_image(index)} key={index}/>
            )
        });
    }

    populateButtons = () => {
        return _.map(this.props.bottle_types, (item, index)=> {
            return (
                <Button variant="contained" style={bottleButton} size="large" onClick={() => this.props.change_bottle(index)} key={index}>
                    {item}
                </Button>
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
            <div>
                <div className={(this.props.recipient_relations > 0) ? "showMessage" :"hideMessage"}>
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
    }

    populateDescriptions = () => {
        return _.map(this.props.result_cards, (item, index)=> {
            return (
                <div className="description" key={index}>- {item[0]} : {item[1]}</div>
            )
        })
    }
    render() {
        return (
            <section id="checkout">
                <Header />
                <div className="leftBox">
                    <div className="imgContainer">
                        <div className="otherImgs">
                            {this.populateImgs()}
                        </div>
                        <img src={this.props.bottle_imgs[this.props.bottle_opt][this.props.img_opt]} alt={this.props.bottle_imgs[this.props.bottle_opt][this.props.img_opt]} />
                    </div>

                    <div className="perfumeInfo">
                        <div className="title">{this.props.result_title}</div>
                        {this.populateDescriptions()}
                    </div>
                </div>

                <div className="rightBox">
                    {this.populateButtons()}
                    {this.writeMessage()}
                    <div className="checkOutButton">
                        <StripeProvider apiKey={APIConfig.stripe_key}>
                            <Elements>
                                <CheckOutButton />
                            </Elements>
                        </StripeProvider>
                    </div>
                </div>
            </section>
        );
    }
}

export { CheckOutComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { bottle_imgs, bottle_opt, bottle_types, img_opt, message, recipient_relations, result_cards, result_title } = quiz;
    return {
        ...ownProps,
        bottle_imgs,
        bottle_opt,
        bottle_types,
        img_opt,
        message,
        recipient_relations,
        result_cards,
        result_title,
    };
};

export const CheckOut = connect(mapStateToProps, {
    change_bottle,
    change_image,
    change_message
})(CheckOutComponent);
