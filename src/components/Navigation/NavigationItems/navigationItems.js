import React from 'react';

import classes from './navigationItems.module.css';
import NavigationItem from './NavigationItem/navigationItem';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
      <NavigationItem link="/orders" >My Orders</NavigationItem>
    </ul>
  );
}

export default navigationItems;