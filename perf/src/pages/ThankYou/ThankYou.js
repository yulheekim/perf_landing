import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
    Header,
    OneLiner,
} from '../../components';
import './styles.css';


class ThankYouComponent extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Header />
                <OneLiner message="Thank You" />
            </div>
        );
    }
}

export { ThankYouComponent };

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    };
};

export const ThankYou = connect(mapStateToProps, {
})(ThankYouComponent);
