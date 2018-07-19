import _ from 'lodash';
import React from 'react';

import './styles.css';

const ScentCard = (result_cards, reveal_cards, onClickCard) => {
    return _.map(result_cards, (item, index) => {
        // need to change this after we settle how the result json will look like.
        return (
            <div
                key={index}
                onClick={()=> onClickCard(index)}
            >
                {reveal_cards[index] ? item : "Click to Reveal"}
            </div>
        )
    });
}

export const ResultCards = ({result_cards, reveal_cards, onClickCard}) => {
    return (
        <div className="cardsContainer">
            {ScentCard(result_cards, reveal_cards, onClickCard)}
        </div>
    )
}
