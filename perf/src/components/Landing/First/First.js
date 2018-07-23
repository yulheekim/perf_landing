import Button from '@material-ui/core/Button';
import React from 'react';
import { Link } from 'react-router-dom';

import {
    OneLiner,
    ScrollDown,
} from '../../Common';
import './styles.css';


const First = () => {
    return (
        <section className="firstSection" id="first">
            <OneLiner message="Personalized Fragrance Designed by You" />

            <div className="getStarted">
                <Link to="quiz" className="quizLink" >
                    <Button className="quizButton" variant="contained" size="large">
                        Get Started!
                    </Button>
                </Link>
            </div>

            <ScrollDown message="Learn More" moveto="whyperf" />
        </section>
    ) 
}

export { First };
