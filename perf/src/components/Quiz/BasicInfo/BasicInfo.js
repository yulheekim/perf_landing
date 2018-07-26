import _ from 'lodash';
import { MenuItem, Radio, Select, TextField } from '@material-ui/core';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import {
    ScrollDown
} from '../../../components';
import {
    change_relations,
    change_taker_name,
    change_recipient_name,
    change_sexuality,
} from '../../../ducks/quiz';


class BasicInfoComponent extends Component {

    recipient = () => {
        return (
            <Select
                onChange={this.handleRelationChange}
                value={this.props.recipient_relations}
            >
                {this.menuItems()}
            </Select>
        )
    };

    menuItems = () => {
        return _.map(this.props.recipient_options, (item, index) => {
            return (
                <MenuItem value={index} key={index}> {item} </MenuItem>
            )
        })
    };

    handleRelationChange = (event) => {
        this.props.change_relations(event.target.value);
    };
    handleTakerNameChange = (event) => {
        this.props.change_taker_name(event.target.value);
    };
    handleRecipientNameChange = (event) => {
        this.props.change_recipient_name(event.target.value);
    };
    handleSexualityChange = (event) => {
        this.props.change_sexuality(event.target.value);
    };

    sexualityPicker = () => {
        const style = {
            smallRadio: {
                fontSize: 20
            }
        }
        return _.map(this.props.sexuality_options, (item, index) => {
            if(index % 2 === 0) {
                return (
                    <div className="sexualityRadio" key={index}>
                        <Radio
                            checked={this.props.sexuality === item}
                            onChange={this.handleSexualityChange}
                            value={item}
                            label={item}
                            name="sexuality-picker"
                        />
                        <div className="itemText">
                            {item}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="sexualityRadio" key={index}>
                        <Radio
                            key={index}
                            checked={this.props.sexuality === item}
                            onChange={this.handleSexualityChange}
                            value={item}
                            name="sexuality-picker"
                            className="smallRadio"
                            label={item}
                            icon={<RadioButtonUncheckedIcon style={style.smallRadio} />}
                            checkedIcon={<RadioButtonCheckedIcon style={style.smallRadio} />}
                        />
                    </div>
                )
            }

        });
    }

    render() {
        var done = false;
        if ((this.props.taker_name !== "") &&
        ((this.props.recipient_relations > 0 && this.props.recipient_name !== "") || (this.props.recipient_relations === 0)) &&
        (this.props.sexuality !== "") &&
        (this.props.questions[0].question_text !== "") ){
            done = true;
        }
        return (
            <section className="basicinfo">
                <div className="inputWrapper">
                    Help us learn more about
                    <div className="inputBox">
                        {this.recipient()}
                    </div>
                </div>
                <div>
                    This perfume will be designed by
                    <TextField required
                        label="Quiz Taker's Name"
                        value={this.props.taker_name}
                        onChange={this.handleTakerNameChange}
                        margin="normal"
                        className="inputBox"
                    />
                </div>
                <div className={(this.props.recipient_relations > 0) ? "showFor" :"hideFor"}>
                    for
                    <TextField required
                        label="Recipient's Name"
                        value={this.props.recipient_name}
                        onChange={this.handleRecipientNameChange}
                        margin="normal"
                        className="inputBox"
                    />
                </div>
                <div className="sexualityPicker">
                    Which way do you want this scent lean to?
                    <div className="sexualityItem">
                        {this.props.sexuality}
                    </div>
                    <div className="radios">
                        {this.sexualityPicker()}
                    </div>
                </div>
                <div className={done ? "showDown" : "hideDown"} >
                    <ScrollDown message="Proceed on to the quiz!" moveto="questions"/>
                </div>
            </section>
        );
    }
}

export { BasicInfoComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { recipient_options, recipient_relations, taker_name, recipient_name, sexuality, sexuality_options, questions } = quiz;

    return {
      ...ownProps,
      recipient_options,
      recipient_relations,
      taker_name,
      recipient_name,
      sexuality,
      sexuality_options,
      questions
    };
};

export const BasicInfo = connect(mapStateToProps, {
    change_relations,
    change_taker_name,
    change_recipient_name,
    change_sexuality,
})(BasicInfoComponent);
