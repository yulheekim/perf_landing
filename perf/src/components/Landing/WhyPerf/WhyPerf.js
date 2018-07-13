import React, {Component} from 'react';
import { connect } from 'react-redux';

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
        return (
            <div className="circleWrapper">
                <button
                    onClick={()=>this.toggleModal(id)}
                    className="circle"
                    onMouseEnter={()=>this.toggleModal(id)}
                    onMouseLeave={()=>this.toggleModal(0)}
                />
                <div className="reason">{this.props.why_descs[id]}</div>

            </div>

        );
    }

    render() {
        return (
            <section id="whyperf" className={window.innerWidth <= 768 ? "mobile" : this.props.show_which > 0 ? "descShowSection": "descHide"}>
                <OneLiner message="Why Perf?" />
                <div className="circleRow">
                    {this.modalCircle(1)}
                    {this.modalCircle(2)}
                    {this.modalCircle(3)}
                </div>
                <div className={this.props.show_which > 0 ? "descShow" : "descHide"}>
                    {this.props.why_descs[this.props.show_which]}
                </div>
                <ScrollDown message="See Reviews" moveto="reviews"/>
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
