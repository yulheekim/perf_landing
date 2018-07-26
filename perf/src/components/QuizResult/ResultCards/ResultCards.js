import _ from 'lodash';
import React from 'react';
import ReactCardFlip from 'react-card-flip';

import './styles.css';

const ScentCard = (result_cards, reveal_cards, onClickCard) => {
    return _.map(result_cards, (item, index) => {
        // need to change this after we settle how the result json will look like.
        return (
                <div  className="card" key={index}>
                    <ReactCardFlip isFlipped={reveal_cards[index]} >
                        <div key="front" className="front" onClick={()=> onClickCard(index)}>
                            <img src="https://media.giphy.com/media/l49JLwNcYKjxHJThu/giphy.gif" alt="front"/>
                            {"Click to Reveal"}
                        </div>
                        <div key="back" className="back">
                            <div className="resultContainer">
                                <img src={item['image_lnk']} alt="back"/>
                                <div className="results">{item['name']}</div>
                                <div className="resultDescription">{item['description']}</div>
                            </div>
                        </div>
                    </ReactCardFlip>
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
