import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  Header,
} from '../../components';
import styles from './styles';


class ThankYouComponent extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Header />
        
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
