import React from 'react';

import {
    Header,
} from '../../components';
import './styles.css';



const About = ({}) => {
    
    return (
        <div>
            <Header />
            
            <h1 className="aboutTitleStyle">About Us</h1>
            <p className="paragraph">
                Perf started from this question: “What on earth does ‘sexy & oriental’ scent mean?” We were puzzled by confusing scent descriptions and the difficulty they bring when buying a perfume. Adding to that, there are just SO many things to consider when buying a single perfume, like, Top note? Middle note? Musky or Aquatic?
            </p>
            <p className="paragraph">
                We wanted to make this process easy and enjoyable. A group of students with creative minds at Northwestern University came together and created Perf. We match your unique personality with our scents to gift you the most delightful perfume-buying experience.
            </p>
        </div>
    );
}

export { About };
