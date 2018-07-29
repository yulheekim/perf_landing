import { connect } from 'react-redux';
import React, { Component } from 'react';
import monkey from '../../assets/500Monkey.jpg';

import {
    Header,
} from '../../components';
import './styles.css';



class ServerErrorComponent extends Component {
    ComponentWillUnmount () {
        this.props.clear_error_quiz();
        this.props.clear_error_checkout();
    }
    render() {
        return (
            <div className="App">
                <Header />
                <header className="App-header">
                <h1 className="App-title">500 Internal Server Error</h1>
                <span>
                    We're sorry. Our monkeys are on it so it should be fixed soon!
                </span>
                </header>
                <img src={monkey} alt="engineers" />
           </div>
        );
    }
}

export { ServerErrorComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz, checkout } = state;
    const quiz_error_message = quiz.error_message;
    const checkout_error_message = checkout.error_message;
    return {
      ...ownProps,
      quiz_error_message,
      checkout_error_message
    };
};

export const ServerError = connect(mapStateToProps, {
})(ServerErrorComponent);
