import React from 'react';

import classes from './toolbar.module.css';
import Logo from '../../Logo/logo';
import NavigationItems from '../NavigationItems/navigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/drawerToggle';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.clicked} />
      <div className={classes.LogoContainer}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default toolbar;