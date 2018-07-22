import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import TrackVisibility from 'react-on-screen';

import  distill  from '../../assets/result/distill.gif'
import {
    Header,
    ResultCards,
    ScrollDown,
} from '../../components';
import {
    reveal_card,
    start_distilling,
} from '../../ducks/quiz';
import './styles.css';



class QuizResultComponent extends Component {

    disableScrolling = () => {
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
    }

    enableScrolling = () => {
        window.onscroll=function(){};
    }

    shown = () => {
        console.log("yoyo wassup")
        this.props.start_distilling();
    }
    render() {
        (this.props.reveal_cards.every((x) => x===true)) ? this.enableScrolling() : this.disableScrolling();
        if (this.props.isDistilling) {
            return(
                <Redirect to="checkout" />
            )
        }
        return (
            <div>
                <Header />
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

                <section id="distilling">
                    <div className="textContainer">
                        Distilling a perf fragrance for you...
                    </div>

                    <div className="wait">
                        <TrackVisibility className="hideVis">
                            {({ isVisible }) => isVisible && setTimeout(this.props.start_distilling, 3000)}
                        </TrackVisibility>
                        <img src={distill} alt="distilling GIF" className="distillGif"/>
                        <CircularProgress size = {400} thickness = {2} />
                        <Link to="checkout">
                            <br/>Click here if the page does not automatically redirect in 3 seconds
                        </Link>
                    </div>

              </section>
            </div>
        );
    }
}

export { QuizResultComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { isDistilling, result_cards, reveal_cards } = quiz;
    return {
      ...ownProps,
      isDistilling,
      result_cards,
      reveal_cards
    };
};

export const QuizResult = connect(mapStateToProps, {
    reveal_card,
    start_distilling
})(QuizResultComponent);
