import React from 'react';

import Burger from '../../burger/burger';
import Button from '../../UI/Button/button';
import classes from './checkoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h2>Your Delicious Burger is here :)</h2>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger Ingredients={props.Ingredients} />
      </div>
      <Button type="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button type="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
}

export default checkoutSummary;