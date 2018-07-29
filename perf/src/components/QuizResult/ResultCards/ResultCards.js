import _ from 'lodash';
import React from 'react';
import ReactCardFlip from 'react-card-flip';

import './styles.css';

const ScentCard = (result_cards, reveal_cards, onClickCard) => {
    return _.map(result_cards, (item, index) => {
        // need to change this after we settle how the result json will look like.
        return (
                <div className="cardContainer" key={index}>
                    <ReactCardFlip isFlipped={reveal_cards[index]} >
                        <div key="front" className="front" onClick={()=> onClickCard(index)}>
                            <div className="card">
                                <img src={item['image_lnk']} alt="front"/>
                                <div className="overlay"><div className="results">{item['name']}</div><div className="reveal">Click to Reveal</div><hr className="hr" /></div>
                                <div className="results">{item['name']}</div>
                                <div className="reveal">Click to Reveal</div>
                                <hr className="hr" />
                            </div>
                        </div>
                        <div key="back" className="back">
                            <div className="card">
                                <img src={item['image_lnk']} alt="back"/>
                                <div className="overlayBack"></div>
                                <div className="resultsBack">{item['name']}</div>
                                <div className="resultDescription">{item['description'][0]}</div>
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
