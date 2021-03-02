import React from 'react';

import NavigationItems from '../NavigationItems/navigationItems';
import Logo from '../../Logo/logo';
import classes from './sideDrawer.module.css';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <div className={attachedClasses.join(' ')}>
      <div className={classes.LogoContainer}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
}

export default sideDrawer;