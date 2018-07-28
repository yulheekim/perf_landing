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

var cats = [
    'https://i.kym-cdn.com/entries/icons/square/000/002/232/bullet_cat.jpg',
    'https://imgix.bustle.com/uploads/image/2018/4/18/5f312113-eaa8-4e71-9360-871e51084f4f-fotolia_125402501_subscription_monthly_m.jpg?w=970&h=582&fit=crop&crop=faces&auto=format&q=70',
    'http://catsatthestudios.com/wp-content/uploads/2017/12/12920541_1345368955489850_5587934409579916708_n-2-960x410.jpg',
    'https://www.telegraph.co.uk/content/dam/pets/2017/01/06/1-JS117202740-yana-two-face-cat-news_trans_NvBQzQNjv4BqJNqHJA5DVIMqgv_1zKR2kxRY9bnFVTp4QZlQjJfe6H0.jpg?imwidth=450',
    'https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg',
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
                    />
                </div>
        )
    };

    render() {
        return (
            <section id="reviews" className="reviewSection">
                <div className="backdrop" />
                <div className="sectionBody">
                    <OneLiner message="Proudly made by Perf" />
                        {this.slider()}
                    <div className="description">
                        {this.props.currentSlider}
                    </div>
                    <div className="getStarted2">
                        <Link to="quiz" className="quizLink">
                            <Button className="quizButton" variant="contained" size="large">
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
