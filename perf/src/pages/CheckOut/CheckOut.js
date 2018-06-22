import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {StripeProvider} from 'react-stripe-elements';


class CheckOutComponent extends Component {


  render() {
    return (
      <StripeProvider apiKey="pk_test_gP3gqSSBvypkudXyIkjx8xpB">
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Checkout</h1>
          </header>
          <body>
            <form>
              <TextField
                />
            </form>
          </body>
        </div>
      </StripeProvider>
    );
  }

}

export { CheckOutComponent };

const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps
    };
};

export const CheckOut = connect(mapStateToProps, {
})(CheckOutComponent);
