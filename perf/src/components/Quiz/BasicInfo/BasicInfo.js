import _ from 'lodash';
import { MenuItem, Radio, Select, TextField } from '@material-ui/core';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import {
    change_relations,
    change_taker_name,
    change_recepient_name,
    change_sexuality,
} from '../../../ducks/quiz';


class BasicInfoComponent extends Component {

    componentDidMount () {
        /*
        load needed infos
        1. gift options
        2. sexuality options
        */
    }

    recepient = () => {
        return (
            <Select
                onChange={this.handleRelationChange}
                value={this.props.recepient_relations}
            >
                {this.menuItems()}
            </Select>
        )
    };

    menuItems = () => {
        return _.map(this.props.recepient_options, (item, index) => {
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
    handleRecepientNameChange = (event) => {
        this.props.change_recepient_name(event.target.value);
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
                        {item}
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
        return (
            <section>
                <div>
                    Help us learn more about {this.recepient()}
                </div>
                <div>
                    This perfume will be designed by
                    <TextField
                        label="Quiz Taker's Name"
                        value={this.props.taker_name}
                        onChange={this.handleTakerNameChange}
                        margin="normal"
                    />
                </div>
                <div className={(this.props.recepient_relations > 0) ? "showFor" :"hideFor"}>
                    for
                    <TextField
                        label="Recepient's Name"
                        value={this.props.recepient_name}
                        onChange={this.handleRecepientNameChange}
                        margin="normal"
                    />
                </div>
                <div className="sexualityPicker">
                    Which way do you want this scent lean to?
                    {this.props.sexuality}
                    <div className="radios">
                        {this.sexualityPicker()}
                    </div>
                </div>


            </section>
        );
    }
}

export { BasicInfoComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { recepient_options, recepient_relations, taker_name, recepient_name, sexuality, sexuality_options } = quiz;

    return {
      ...ownProps,
      recepient_options,
      recepient_relations,
      taker_name,
      recepient_name,
      sexuality,
      sexuality_options
    };
};

export const BasicInfo = connect(mapStateToProps, {
    change_relations,
    change_taker_name,
    change_recepient_name,
    change_sexuality,
})(BasicInfoComponent);
