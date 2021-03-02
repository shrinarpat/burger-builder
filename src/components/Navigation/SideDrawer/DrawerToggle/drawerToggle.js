import React from 'react';

import classes from './drawerToggle.module.css';

const drawerToggel = (props) => {
  return (
    <div onClick={props.clicked}
      className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default drawerToggel;