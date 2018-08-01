import { connect } from 'react-redux';
import React, { Component } from 'react';
import ScrollLock from 'react-scroll-lock-component';

import {
  BasicInfo,
  Header,
  Question,
} from '../../components';
import {
  clear_basicinfo,
  load_quiz,
  start_over,
} from '../../ducks/quiz';
import './styles.css';


class QuizComponent extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.load_quiz("dinner");
        this.props.clear_basicinfo();
        this.props.start_over();
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
                <div className="basicInfo">
                    <BasicInfo/>
                </div>
              </ScrollLock>
              <Question questions={this.props.questions}/>
          </div>
      );
    }
}

export { QuizComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { answers, questions } = quiz;
    return {
      ...ownProps,
      answers,
      questions,
    };
};

export const Quiz = connect(mapStateToProps, {
    clear_basicinfo,
    load_quiz,
    start_over
})(QuizComponent);
