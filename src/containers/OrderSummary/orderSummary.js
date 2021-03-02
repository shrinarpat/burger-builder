import React, { Component } from 'react';

import Auxilary from '../../hoc/Auxilary/auxilary';
import Button from '../../components/UI/Button/button';

class OrderSummary extends Component {
  componentDidUpdate() {
    //console.log('[OrderSummary] component');
  }
  render() {
    const ingredients = Object.keys(this.props.ingredients).map(igKey => {
      return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{this.props.ingredients[igKey]}</li>
    });
    return (
      <Auxilary>
        <h3>Your Order </h3>
        <p>The ingredients list of sweet Burger</p>
        <ul>
          {ingredients}
        </ul>
        <p>Continue to Checkout? </p>
        <p><strong>Total Price: {this.props.burgerPrice.toFixed(2)}</strong></p>
        <Button type="Danger" clicked={this.props.cancelOrder}> Cancel</Button>
        <Button type="Success" clicked={this.props.continueOrder}>Continue</Button>
      </Auxilary >
    );
  }
}

export default OrderSummary;