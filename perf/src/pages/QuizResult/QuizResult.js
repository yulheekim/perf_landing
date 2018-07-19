import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Header,
    ResultCards,
    ScrollDown,
} from '../../components';
import { 
    reveal_card
} from '../../ducks/quiz';
import './styles.css';



class QuizResultComponent extends Component {
    render() {
        return (
            <div>
                <section>
                    <Header />
                    <span>
                        We have found you a match!
                    </span>
                    <ResultCards 
                        result_cards={this.props.result_cards}
                        reveal_cards={this.props.reveal_cards} 
                        onClickCard={this.props.reveal_card}
                    />
                    <ScrollDown message="Meet your fragrance" moveto="distilling" />
                </section>
                <section id="distilling">
                    nihao
                </section>
            </div>
        );
    }
}

export { QuizResultComponent };

const mapStateToProps = (state, ownProps) => {
    const { quiz } = state;
    const { result_cards, reveal_cards } = quiz;
    return {
      ...ownProps,
      result_cards,
      reveal_cards
    };
};

export const QuizResult = connect(mapStateToProps, {
    reveal_card,
})(QuizResultComponent);