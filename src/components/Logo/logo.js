import React from 'react';
import classes from './logo.module.css';
import burgerLogo from '../../assets/Images/burger-logo.png';

const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Sweet-Burger" />
    </div>
  );
}

export default logo;