import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import MobileStepper from '@material-ui/core/MobileStepper';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import {
  handle_next,
  start_over
} from '../../../ducks/quiz';
import './styles.css';


class QuestionComponent extends Component {

    componentWillUnmount() {
        this.props.start_over();
    }

    populateOptions = () => {
        return _.map(this.props.questions[this.props.activeStep].cards, (item, index)=> {
            return (
                <div className="option" onClick={() => this.props.handle_next(index)} key={index}>
                    {item.description}
                </div>
            )
        });
    }

    render() {
        if(this.props.activeStep === 7) {
          return (
                <Redirect to="result" />
          )
        }

        return (
            <section id="questions">
                <div className="question">{this.props.questions[this.props.activeStep].question_text}</div>
                <div className="optionsContainer">
                    {this.populateOptions()}
                </div>
                <div className="progressBarContainer">
                    <MobileStepper
                        variant="progress"
                        steps={8}
                        className="progressBar"
                        position="static"
                        activeStep={this.props.activeStep}
                        nextButton={
                            <Button size="small" onClick={this.props.start_over} >
                                Start Over
                            </Button>
                        }
                    />
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { quiz } = state;
  const { activeStep, answers } = quiz;
  return {
    ...ownProps,
    activeStep,
    answers,
  };
}

export const Question = connect(mapStateToProps, {
  handle_next,
  start_over
})(QuestionComponent);
