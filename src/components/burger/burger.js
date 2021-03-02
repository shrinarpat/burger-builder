import React from 'react';

import classes from './burger.module.css';
import BurgerIngredient from './burgerIngredient/burgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.Ingredients).map(igKey => {
    return [...Array(props.Ingredients[igKey])].map((_, id) => {
      return <BurgerIngredient key={igKey + id} type={igKey} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  // transformedIngredients = transformedIngredients.reduce((arr, el) => {
  //   return arr.concat(el);
  // }, []);

  //console.log(transformedIngredients);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>(: Please start adding ingredients :)</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;