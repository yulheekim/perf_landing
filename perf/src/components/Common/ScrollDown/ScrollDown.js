import Scroll from 'react-scroll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react';

import styles from './styles';

const {
    downStyle,
    downIconStyle,
} = styles

var Link = Scroll.Link;

const ScrollDown = ({message, moveto}) => {
    return (
        <Link to={moveto} spy={true} smooth={true} duration={250} style={downStyle}>
            {message}
            <ExpandMoreIcon style={downIconStyle}/>
        </Link>
    )
};

export { ScrollDown };