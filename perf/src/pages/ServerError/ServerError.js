import { connect } from 'react-redux';
import React, { Component } from 'react';
import monkey from '../../assets/500Monkey.jpg';

import {
    Header,
} from '../../components';
import './styles.css';



class ServerErrorComponent extends Component {
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
    return {
      ...ownProps,
    };
};

export const ServerError = connect(mapStateToProps, {
})(ServerErrorComponent);
