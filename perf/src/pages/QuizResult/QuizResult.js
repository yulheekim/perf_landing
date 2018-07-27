import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ScrollLock from 'react-scroll-lock-component';
import TrackVisibility from 'react-on-screen';

import  distill  from '../../assets/result/distill.gif'
import {
    Header,
    ResultCards,
    ScrollDown,
} from '../../components';
import {
    hide_cards,
    reveal_card,
    start_distilling,
    load_result,
} from '../../ducks/quiz';
import './styles.css';
import styles from './styles';
const {
    circularProgress,
} = styles



class QuizResultComponent extends Component {
    componentDidMount() {
        console.log(this.props.result_title);
        console.log(this.props.answers);
        console.log(this.props.recipient_relations);
        console.log(this.props.quiz_id);
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        this.props.hide_cards();
    }
    render() {
        if (this.props.isDistilling) {
            return(
                <Redirect to="checkout" />
            )
        }
        else if (this.props.error_message) {
            return(
                <Redirect to="quiz" />
            )
        }
        return (
            <ScrollLock>
            <div className="quizResultStyle">
                <Header />
                <ScrollLock>
                <section>

                    <div className="textContainer">
                        We have found your three scent profiles!
                    </div>
                    <ResultCards
                        result_cards={this.props.result_cards}
                        reveal_cards={this.props.reveal_cards}
                        onClickCard={this.props.reveal_card}
                    />
                    <div className={this.props.reveal_cards.every((x) => x===true) ? "showDown" : "hideDown"} >
                        <ScrollDown message="Meet your fragrance" moveto="distilling"/>
                    </div>
                </section>
                </ScrollLock>
                <ScrollLock>
                <section id="distilling">
                    <div className="textContainer">
                        Distilling a perf fragrance for you...
                    </div>
                    <img src={distill} alt="distilling GIF" className="distillGif"/>
                    <div className="distillContainer">
                        <CircularProgress size = {window.innerHeight*0.43} thickness = {2} style={circularProgress}/>
                    </div>
                    <TrackVisibility className="hideVis">
                        {({ isVisible }) => isVisible && setTimeout(this.props.start_distilling, 3000)}
                    </TrackVisibility>
                    <div className="linkToCheckout">
                        <Link to="checkout">
                            <br/>Click here if the page does not automatically redirect in 3 seconds
                        </Link>
                    </div>

                </section>
                </ScrollLock>
            </div>
            </ScrollLock>
        );
    }
}

export { QuizResultComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { isDistilling, result_cards, reveal_cards, recipient_relations, quiz_id, answers, result_title, } = quiz;
    return {
      ...ownProps,
      isDistilling,
      result_cards,
      reveal_cards,
      recipient_relations,
      quiz_id,
      answers,
      result_title
    };
};

export const QuizResult = connect(mapStateToProps, {
    hide_cards,
    reveal_card,
    start_distilling,
    load_result,
})(QuizResultComponent);
