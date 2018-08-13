import React, {Component} from 'react';
import { connect } from 'react-redux';

import whyperf1 from '../../../assets/landing/whyperf1.png';
import whyperf2 from '../../../assets/landing/whyperf2.png';
import whyperf3 from '../../../assets/landing/whyperf3.png';
import './styles.css';

import {
  ScrollDown,
} from '../../Common';



class WhyPerfComponent extends Component {

    modalCircle = (img, desc) => {
        return (
            <div className="circleColumn">
                <img src={img} className="reasonImageStyle"/>
                <div className="reason">
                    <blockquote>
                        <p>
                        {desc}
                        </p>
                    </blockquote>
                </div>
            </div>
        )
    }

    render() {

        return (
            <section id="whyperf" className={window.innerWidth <= 768 ? "mobile" : this.props.show_which > 0 ? "descShowSection": "descHideSection"}>
                <div className="backdrop" />
                <div className="whyperfSection">
                    <div className="circles">
                        {this.modalCircle(whyperf1, this.props.why_descs[0])}
                        {this.modalCircle(whyperf2, this.props.why_descs[1])}
                        {this.modalCircle(whyperf3, this.props.why_descs[2])}
                    </div>
                    <ScrollDown message="Reviews" moveto="reviews"/>
                </div>
            </section>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  const { landing } = state;
  const { why_descs } = landing;
  return {
    ...ownProps,
    why_descs
  };
}

export const WhyPerf = connect(mapStateToProps, {
})(WhyPerfComponent);
