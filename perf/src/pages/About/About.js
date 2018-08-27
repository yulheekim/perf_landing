import React from 'react';

import {
    Header,
} from '../../components';
import './styles.css';

const aboutParagraph = (text) => {
    return (
        <p className="paragraph"> &nbsp; &nbsp; &nbsp; &nbsp; {text} </p>
    );
};

const aboutQuote = (text) => {
    return (
        <p className="quote">&nbsp; &nbsp; &nbsp; &nbsp; &quot; {text}&quot;</p>
    );
};

const About = () => {

    return (
        <div style={{"backgroundColor": "white"}}>
            <Header />
                <h1 className="aboutFirstTitleStyle">About Us</h1>
                {aboutParagraph(
                    "Perf started from this question: “What on earth does ‘sexy & oriental’ scent mean?” We were puzzled by confusing scent descriptions and the difficulty they bring when buying a perfume. Adding to that, there are just SO many things to consider when buying a single perfume, like, Top note? Middle note? Musky or Aquatic?"
                    )}
                {aboutParagraph(
                    "We wanted to make this process easy and enjoyable. A group of students with creative minds at Northwestern University came together and created Perf. We match your unique personality with our scents to gift you the most delightful perfume-buying experience."
                    )}
                <h1 className="aboutTitleStyle">What Others Say</h1>
                {aboutQuote(
                    "Unique Scent"
                )}
                {aboutQuote(
                    "I don't usually wear perfume because I don't often like the scents, but I loved this one! It was easire to just get one option centered to me rather than choose from a ton in the store."
                )}
                {aboutQuote(
                    "It was so much fun to receive the sample and made me much more confident in purchasing the larger size!"
                )}
        </div>
    );
}

export { About };
