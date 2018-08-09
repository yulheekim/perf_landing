import React, { Component } from 'react';
import logo from '../../../assets/logo/new_logo.png';
import { Link } from 'react-router-dom'
import { AccountCircle, Home, LocalDining } from '@material-ui/icons';
import { slide as Menu } from 'react-burger-menu';

import './styles.css';
import styles from './styles';

const {
  menuStyles,
  menuMobileStyles,
} = styles;

class Header extends Component {

  render() {
    return (
      <div className="header">
        <Menu styles={(window.innerWidth > 425) ? menuStyles : menuMobileStyles}>
          <Link to="" style={menuStyles.bmItem} className="menu-item">
              <Home />
              <span className="menuItemText">
                Home
              </span>
          </Link>
          <Link to="quiz" style={menuStyles.bmItem} className="menu-item">
              <LocalDining />
              <span className="menuItemText">
                Quiz
              </span>
          </Link>
          <Link to="about" style={menuStyles.bmItem} className="menu-item">
              <AccountCircle />
              <span className="menuItemText">
                About Us
              </span>
          </Link>
        </Menu>
        <div className="logoContainer">
        <Link to ="" className="perf-link">
          <img src={logo} className="perf-logo" alt="logo" />
        </Link>
        </div>
      </div>
    );
  }
}

export { Header };
