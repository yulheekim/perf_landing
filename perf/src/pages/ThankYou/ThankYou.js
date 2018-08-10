import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
    Header,
    OneLiner,
} from '../../components';
import './styles.css';
import {
    reset_thankyou,
    CHECKOUT_LOADING,
    CHECKOUT_LOADED,
} from '../../ducks/checkout';

import styles from './styles';
const {
    quizButton,
    progressStyle
} = styles

class ThankYouComponent extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        this.props.reset_thankyou();
    }


    render() {
        if (this.props.checkout_status === '') {
            return (
                <Redirect to="" />
            )
        }
        return (
            
            <section id="thankyou">
                <Header />
                <OneLiner message="THANK YOU!" />
                {this.props.checkout_status === CHECKOUT_LOADED ? 
                <div>
                <div className="orderInfoContainer">
                    Order # {this.props.order_id}
                </div>
                <div className="guide">
                    You're all set! You should be receiving an order confirmation email shortly.<br/>If you have any questions, please feel free to email <i>tryperf@gmail.com</i>.
                </div>
                <Link to="quiz" className="quizLink">
                    <Button variant="contained" color="primary" style={quizButton}>Continue Shopping</Button>
                </Link> 
                </div>:
                <div className="loadingContainer">
                    Processing your payment...
                    <CircularProgress size = {window.innerHeight*0.21} thickness = {1} style={progressStyle} />
                </div>
            }
            </section>
        );
        
    }
}

export { ThankYouComponent };

const mapStateToProps = (state, ownProps) => {
    const { checkout } = state;
    const { order_id, checkout_status } = checkout;
    return {
        ...ownProps,
        order_id,
        checkout_status,
    };
};

export const ThankYou = connect(mapStateToProps, {
    reset_thankyou,
})(ThankYouComponent);
