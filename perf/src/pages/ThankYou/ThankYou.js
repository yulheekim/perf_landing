import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    Header,
    OneLiner,
} from '../../components';
import './styles.css';
import {
    reset_id
} from '../../ducks/checkout';

import styles from './styles';
const {
    quizButton,
} = styles

class ThankYouComponent extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        this.props.reset_id();
    }


    render() {
        return (
            <section id="thankyou">
                <Header />
                <OneLiner message="THANK YOU!" />
                <div className="orderInfoContainer">
                    Order # {this.props.order_id}
                </div>
                <div className="guide">
                    You're all set! You should be receiving an order confirmation email shortly.<br/>If you have any questions, please feel free to email <i>tryperf@gmail.com</i>.
                </div>
                <Link to="quiz" className="quizLink">
                    <Button variant="contained" color="primary" style={quizButton}>Continue Shopping</Button>
                </Link>
            </section>
        );
    }
}

export { ThankYouComponent };

const mapStateToProps = (state, ownProps) => {
    const { checkout } = state;
    const { order_id } = checkout;
    return {
        ...ownProps,
        order_id
    };
};

export const ThankYou = connect(mapStateToProps, {
    reset_id,
})(ThankYouComponent);
