import { connect } from 'react-redux';
import React, { Component } from 'react';
import ScrollLock from 'react-scroll-lock-component';

import {
  BasicInfo,
  Header,
  Question,
} from '../../components';
import {
  load_quiz
} from '../../ducks/quiz';
import './styles.css';


class QuizComponent extends Component {
    componentWillMount() {
        this.props.load_quiz("dinner");
        window.scrollTo(0, 0);
    }
    render() {
    //   if(this.props.error_message !== "") {
    //       /*
    //       Need this to be a 500 page.
    //       */
    //       return (
    //         <Redirect to="nomatch" />
    //       )
    //   }
      return (
          <div className="quizStyle">
              <Header />
              <ScrollLock>
                <BasicInfo />
              </ScrollLock>
              <Question questions={this.props.questions}/>
          </div>
      );
    }
}

export { QuizComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { questions } = quiz;
    return {
      ...ownProps,
      questions,
    };
};

export const Quiz = connect(mapStateToProps, {
    load_quiz
})(QuizComponent);