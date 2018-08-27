import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu';

import fblogo from '../../../assets/landing/facebook.png';
import iglogo from '../../../assets/landing/instagram.png';
import logo from '../../../assets/logo/new_logo.png';
import menuIcon from '../../../assets/landing/menu-icon.png';
import './styles.css';
import styles from './styles';

const {menuStyles, menuMobileStyles} = styles;

class Header extends Component {

    render() {
        const landingUrl = "https://www.yourperf.com/";
        return (
        <div className="header">
            <Menu customBurgerIcon={ <img src={menuIcon} alt="burgerMenuIcon"/> }
                width={ '100%' }
                styles={(
                    window.innerWidth > 425)
                    ? menuStyles
                    : menuMobileStyles}>
                <a href={landingUrl} style={menuStyles.bmItem} className={window.innerWidth > 425 ? "menu-item" : "menu-mobile-item"}>
                    <span className="topRightLink">
                        Home
                    </span>
                </a>
                <a href={landingUrl+"about/"} style={menuStyles.bmItem} className={window.innerWidth > 425 ? "menu-item" : "menu-mobile-item"}>
                    <span className="topRightLink">
                        Why Perf
                    </span>
                </a>
                <a href={landingUrl+"how-it-works/"} style={menuStyles.bmItem} className={window.innerWidth > 425 ? "menu-item" : "menu-mobile-item"}>
                    <span className="topRightLink">
                        How Perf
                    </span>
                </a>
                <a href={landingUrl+"reviews/"} style={menuStyles.bmItem} className={window.innerWidth > 425 ? "menu-item" : "menu-mobile-item"}>
                    <span className="topRightLink">
                        Reviews
                    </span>
                </a>
                <a href={"https://quiz.yourperf.com/quiz"} style={menuStyles.bmItem} className={window.innerWidth > 425 ? "menu-item" : "menu-mobile-item"}>
                    <span className="topRightLink">
                        Quiz
                    </span>
                </a>
                <a href={landingUrl+"subscribe/"} style={menuStyles.bmItem} className={window.innerWidth > 425 ? "menu-item" : "menu-mobile-item"}>
                    <span className="topRightLink2">
                        Subscribe
                    </span>
                </a>
            </Menu>
            <div className="innerHeader">
                <div className="logoContainer">
                    <a href={landingUrl} className="perf-link">
                        <img src={logo} className="perf-logo" alt="logo"/>
                    </a>
                </div>
                <div className={window.innerWidth > 425 ? "topRight" : "hideTopRight"}>
                    <a href={landingUrl} className="topRightLink">
                        Home
                    </a>
                    <a href={landingUrl+"about/"} className="topRightLink">
                        Why Perf
                    </a>
                    <a href={landingUrl+"how-it-works/"} className="topRightLink">
                        How Perf
                    </a>
                    <a href={landingUrl+"reviews/"} className="topRightLink">
                        Reviews
                    </a>
                    <a href={"https://quiz.yourperf.com/quiz"} className="topRightLink">
                        Quiz
                    </a>
                    <a href={landingUrl+"subscribe/"} className="topRightLink2">
                        Subscribe
                    </a>
                    <div className="social">
                        <a href="https://www.instagram.com/tryperf/" className="topRightLink3">
                            <img src={iglogo} alt="iglogo" className="socialLogos"/>
                        </a>
                        <a href="https://www.facebook.com/tryperf/" className="topRightLink3">
                            <img src={fblogo} alt="fblogo" className="socialLogos"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export {
    Header
};
