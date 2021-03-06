import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {
  load_quiz
} from '../../ducks/quiz';
import './styles.css';

class ChooseQuizComponent extends Component {
  gotoQuiz = (whereto) => {
    this.props.load_quiz(whereto);
  }

  render() {
    if(this.props.error_message !== "") {
      /*
      Need this to be a 500 page.
      */
      return (
        <Redirect to="nomatch" />
      )
    }
    if(this.props.quiz_name !== "") {
      return (
        <Redirect to="" />
      )
    }


    return (
      <div className="choosequizStyle">
        <div onClick={()=>this.gotoQuiz("dinner")}>
          To Main
        </div>
        <div onClick={()=>this.gotoQuiz("event")}>
          To Event
        </div>
      </div>
    );
  }
}

export { ChooseQuizComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { error_message, quiz_name } = quiz;
    return {
      ...ownProps,
      error_message,
      quiz_name
    };
};

export const ChooseQuiz = connect(mapStateToProps, {
  load_quiz,
})(ChooseQuizComponent);
