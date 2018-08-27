import Button from '@material-ui/core/Button';
import React from 'react';
import { Link } from 'react-router-dom';

import {
    OneLiner,
    ScrollDown,
} from '../../Common';
import './styles.css';
import styles from './styles';

const {
    buttonStyle,
  } = styles

const First = () => {
    return (
        <section className="firstSection" id="first">
            <div className="sectionBody">
                <OneLiner className="firstLiner" message="Personalized Fragrance Designed by You" />
                <hr className="hr" />
                <div className="getStartedFirst">
                    <Link to="" className="quizLink" >
                        <Button className="quizButton" variant="contained" size="large" style={buttonStyle}>
                            Get Started!
                        </Button>
                    </Link>
                </div>
                <ScrollDown message="Learn More" moveto="whyperf" />
            </div>
            <div className="backdrop"></div>
        </section>
    )
}

export { First };
