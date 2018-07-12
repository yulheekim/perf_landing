import React from 'react';
import {
    Header,
    ScrollDown,
    OneLiner,
} from '../../Common';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './styles.css';



const First = () => {
    return (
        <section className="section" id="first">
            <Header />
            <OneLiner message="Personalized Fragrance Designed by You" />

            <div className="getStarted">
                <Link className="quizLink" to="quiz" >
                    <Button className="quizButton" variant="contained" size="large">
                        Get Started!
                    </Button>
                </Link>
            </div>

            <ScrollDown message={"Learn More"} moveto={"whyperf"} />
        </section>
    )
}

export { First }