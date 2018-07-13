import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
} from '../../components';
import './styles.css';
import { 
  load_quiz
} from '../../ducks/quiz';


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
        <Redirect to="quiz" />
      )
    }

    
    return (
      <div className="choosequizStyle">
        <div onClick={()=>this.gotoQuiz("main")}>
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