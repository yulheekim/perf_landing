import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  BasicInfo,
  Header,
  Question,
} from '../../components';
import './styles.css';


class QuizComponent extends Component {


  render() {
    if (this.props.quiz_name === "") {
      return (
        <Redirect to="choose" />
      )
    }
    return (
      <div className="quizStyle">
          <Header />
          <BasicInfo />
          <Question />
      </div>
    );
  }
}

export { QuizComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { quiz_name } = quiz;
    return {
      ...ownProps,
      quiz_name,
    };
};

export const Quiz = connect(mapStateToProps, {
})(QuizComponent);
