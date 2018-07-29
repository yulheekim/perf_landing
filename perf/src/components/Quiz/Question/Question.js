import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import MobileStepper from '@material-ui/core/MobileStepper';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import {
  handle_next,
  start_over,
  load_result,
} from '../../../ducks/quiz';
import './styles.css';

class QuestionComponent extends Component {

    populateOptions = () => {
        return _.map(this.props.questions[this.props.activeStep].cards, (item, index)=> {
            return (
                <div className="options" key={item.id}>
                    <div className="option" onClick={() => this.props.handle_next(item.id)} >
                        <img className="optionImages" src={item.img_lnk} alt={item.img_lnk}/>
                    </div>
                    <div className="optionText">
                        {item.description}
                    </div>
                </div>
            )
        });
    }

    render() {
        if(this.props.answers.indexOf(-1) === -1) {
            this.props.load_result(this.props.recipient_relations, this.props.quiz_id, this.props.answers);
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
                        position="static"
                        activeStep={this.props.activeStep}
                        nextButton={
                            <Button size="small" onClick={() => this.props.start_over()} >
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
  const { activeStep, answers, recipient_relations, quiz_id } = quiz;
  return {
    ...ownProps,
    activeStep,
    answers,
    recipient_relations,
    quiz_id,
  };
}

export const Question = connect(mapStateToProps, {
  handle_next,
  start_over,
  load_result
})(QuestionComponent);
