import React, {Component} from 'react';
import { connect } from 'react-redux';

import whyperf1 from '../../../assets/landing/whyperf1.png';
import whyperf2 from '../../../assets/landing/whyperf2.png';
import whyperf3 from '../../../assets/landing/whyperf3.png';
import './styles.css';
import {
  toggle_modal,
} from '../../../ducks/landing';
import {
  OneLiner,
  ScrollDown,
} from '../../Common';



class WhyPerfComponent extends Component {
    toggleModal = (id) => {
        this.props.toggle_modal(id);
    }
    modalCircle = (id) => {
        const images = [whyperf1, whyperf2, whyperf3];
        if (id % 2 == 0) {
            return (
                 <div className="circleWrapper">
                     <div className="reason">{this.props.why_descs[id]}</div>
                    <img src={images[id-1]} onClick={()=>this.toggleModal(id)} onMouseEnter={()=>this.toggleModal(id)}
                    onMouseLeave={()=>this.toggleModal(0)}></img>
                </div>
            );
        } else 
            return (
                <div className="circleWrapper">
                    <img src={images[id-1]} onClick={()=>this.toggleModal(id)} onMouseEnter={()=>this.toggleModal(id)}
                    onMouseLeave={()=>this.toggleModal(0)}></img>
                    <div className="reason">{this.props.why_descs[id]}</div>

                </div>
            );
    }

    render() {
        return (
            <section id="whyperf" className={window.innerWidth <= 768 ? "mobile" : this.props.show_which > 0 ? "descShowSection": "descHideSection"}>
                <div className="backdrop" />
                <div className="whyperfSection">
                    <OneLiner message="Why Perf?" />
                    <div className="circleRow">
                        {this.modalCircle(1)}
                        {this.modalCircle(2)}
                        {this.modalCircle(3)}
                    </div>
                    <div className={this.props.show_which > 0 ? "descShow" : "descHide"}>
                        {this.props.why_descs[this.props.show_which]}
                    </div>
                    <ScrollDown message="Reviews" moveto="reviews"/>
                </div>
            </section>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  const { landing } = state;
  const { why_descs, show_which } = landing;
  return {
    ...ownProps,
    show_which,
    why_descs
  };
}

export const WhyPerf = connect(mapStateToProps, {
  toggle_modal
})(WhyPerfComponent);
