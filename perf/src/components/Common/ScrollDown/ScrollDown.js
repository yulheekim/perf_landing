import Scroll from 'react-scroll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react';
import './styles.css';


var Link = Scroll.Link;

const ScrollDown = ({message, moveto}) => {
    return (
        <Link to={moveto} spy={true} smooth={true} duration={450} className="down">
            {message}
            <ExpandMoreIcon className="downIcon"/>
        </Link>
    )
};

export { ScrollDown };