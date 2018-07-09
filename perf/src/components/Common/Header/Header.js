import React, { Component } from 'react';
import logo from '../../../assets/logo/logo_smaller.png';
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { slide as Menu } from 'react-burger-menu';

import './styles.css';
import styles from './styles';

const {
  menuStyles
} = styles;

class Header extends Component {

  render() {
    return (
      <div className="header">
        <Menu styles={menuStyles}>
          <Link to="about"><AccountCircleIcon/>About Us</Link>
        </Menu>
        <img src={logo} className="perf-logo" alt="logo" />
      </div>
    );
  }
}

export { Header };
