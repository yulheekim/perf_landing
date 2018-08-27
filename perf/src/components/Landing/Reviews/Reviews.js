import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CoverFlow from 'coverflow-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    update_slider_desc
} from '../../../ducks/landing';
import {
    OneLiner
} from '../../Common';
import './styles.css';
import styles from './styles';

const {
    buttonStyle,
} = styles

var cats = [
    'https://s3-us-west-2.amazonaws.com/quiz.tryperf.com/reviews/james.jpg',
    'https://s3-us-west-2.amazonaws.com/quiz.tryperf.com/reviews/juno.jpg',
    'https://s3-us-west-2.amazonaws.com/quiz.tryperf.com/reviews/michelle.jpg',
    'https://s3-us-west-2.amazonaws.com/quiz.tryperf.com/reviews/yune.jpg',
]


class ReviewsComponent extends Component {
    handleSelect = (index) => {
        this.props.update_slider_desc(index);
    }

    slider = () => {
        return (
                <div className="coverflowConatiner">
                    <CoverFlow
                        imagesArr={cats}
                        handleSelect={(index)=>this.handleSelect(index)}
                        background="transparent"
                        height={(window.innerWidth <= 320) ? 200:250}
                        width ={(window.innerWidth <= 320) ? 200:250}
                    />
                </div>
        )
    };

    render() {
        return (
            <section id="reviews" className="reviewSection">
                <div className="backdrop" />
                <div className="reviewBody">
                    <OneLiner message="Proudly made by Perf" />
                        {this.slider()}
                    <div className="description">
                        {this.props.reviews[this.props.currentSlider]}
                    </div>
                    <div className="getStarted2">
                        <Link to="" className="quizLink">
                            <Button className="quizButton" variant="contained" size="large" style={buttonStyle}>
                                Get Started!
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const { landing } = state;
    const { reviews, currentSlider } = landing;
    return {
      ...ownProps,
      reviews,
      currentSlider,
    };
}

export const Reviews = connect(mapStateToProps, {
    update_slider_desc,
})(ReviewsComponent);
