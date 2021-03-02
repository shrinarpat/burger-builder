import React from 'react';

import classes from './buildControls.module.css';
import BuildControl from './buildControl/buildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
];

const buildControls = (props) => {
  const bControls = controls.map(c => {
    return <BuildControl key={c.label}
      label={c.label}
      count={props.Ingredients[c.type]}
      disabled={props.disabledIngredients[c.type]}
      added={() => props.ingredientadded(c.type)}
      remove={() => props.ingredientremoved(c.type)}
    />
  });
  return (
    <div className={classes.BuildControls}>
      <p className={classes.BurgerPrice}>Current Price: {props.price.toFixed(2)}$</p>
      <div>{bControls}</div>
      <button className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}>
        Order Sweet Burger
      </button>
    </div>
  );
}

export default buildControls;