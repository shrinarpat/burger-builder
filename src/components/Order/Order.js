import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  let ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      count: props.ingredients[ingredientName]
    })
  }
  const TransformedIngredients = ingredients.map(ingredient => {
    return <span key={ingredient.name}
      style={{
        textTransform: 'capitalize',
        margin: '0px 8px',
        padding: '6px',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
      }}>{ingredient.name}({ingredient.count})</span>
  })
  return (
    <div className={classes.Order}>
      <p>Ingredients: {TransformedIngredients}</p>
      <p>Price: <strong>Rs {props.price.toFixed(2)}</strong></p>
    </div>
  );
}

export default order;