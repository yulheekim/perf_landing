import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
} from '../../components';
import './styles.css';


class QuizComponent extends Component {

  render() {
    return (
      <div className="quizStyle">
          
      </div>
    );
  }
}

export { QuizComponent };

const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps,
    };
};

export const Quiz = connect(mapStateToProps, {
})(QuizComponent);