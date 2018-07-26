import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    Header,
    OneLiner,
} from '../../components';
import './styles.css';
import styles from './styles';
const {
    quizButton,
} = styles

class ThankYouComponent extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <section id="thankyou">
                <Header />
                <OneLiner message="THANK YOU!" />
                <div className="orderInfoContainer">
                    Order #
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
    return {
        ...ownProps,
    };
};

export const ThankYou = connect(mapStateToProps, {
})(ThankYouComponent);
