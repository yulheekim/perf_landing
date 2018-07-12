import React from 'react';
import './styles.css';

const OneLiner = ({ message }) => {
    return (
        <div className="oneliner">
            { message }
        </div>
    )
};

export { OneLiner } 