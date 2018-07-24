import React, { Component } from 'react';
import logo from '../../../assets/logo/new_logo.png';
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { slide as Menu } from 'react-burger-menu';

import './styles.css';
import styles from './styles';

const {
  menuStyles,
} = styles;

class Header extends Component {

  render() {
    return (
      <div className="header">
        <Menu styles={menuStyles}>


          <Link to="" style={menuStyles.bmItem}>
              <AccountCircleIcon />
              <span className="menuItemText">
                About Us
              </span>
          </Link>
          <Link to="quiz" style={menuStyles.bmItem}>
              <AccountCircleIcon /> 
              <span className="menuItemText">
                Quiz
              </span>
          </Link>
        </Menu>
        <Link to ="" className="perf-link">
          <img src={logo} className="perf-logo" alt="logo" />
        </Link>
      </div>
    );
  }
}

export { Header };
