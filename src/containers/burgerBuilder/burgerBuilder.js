import React, { Component } from "react";
import { connect } from "react-redux";

import Auxilary from "../../hoc/Auxilary/auxilary";
import Burger from "../../components/burger/burger";
import axios from "../../axios-orders";
import BuildControls from "../../components/buildControls/buildControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../OrderSummary/orderSummary";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount() {
		this.props.fetchIngredients();
		// axios.get('https://burger-builder-34087-default-rtdb.firebaseio.com/ingredients.json')
		//   .then(res => {
		//     this.setState({ Ingredients: res.data })
		//   }).catch(err => {
		//     this.setState({ error: true })
		//   })
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancel = () => {
		this.setState({ purchasing: false });
	};

	updatePurchaseable = (ingredients) => {
		// const ingredients = { ...this.state.Ingredients };
		let sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	purchaseContinueHandler = () => {
		//alert("Continue with your order :) ");
		// this.setState({ loading: true });
		// const data = {
		//   ingredients: this.state.Ingredients,
		//   price: this.state.totalPrice,
		//   customer: {
		//     name: 'Narpat',
		//     address: {
		//       street: 'Test street',
		//       zipcode: '304543',
		//       country: 'India'
		//     },
		//     email: 'narpatsingh@gmail.com'
		//   },
		//   deliveryMethod: 'fastest'
		// }
		// axios.post('/orders.json', data)
		//   .then(response => {
		//     this.setState({ loading: false, purchasing: false })
		//   }).catch(err => {
		//     this.setState({ loading: false, purchasing: false })
		//   });
		// const queryParams = [];

		// for (let i in this.state.Ingredients) {
		// 	queryParams.push(
		// 		encodeURIComponent(i) +
		// 			"=" +
		// 			encodeURIComponent(this.state.Ingredients[i])
		// 	);
		// }
		// queryParams.push("price=" + this.state.totalPrice);
		// const queryString = queryParams.join("&");
		// this.props.history.push({
		// 	pathname: "/checkout",
		// 	search: "?" + queryString,
		// });
		this.props.onInitPurchased();
		this.props.history.push("/checkout");
	};

	render() {
		let disabledIngredients = {
			...this.props.Ingredients,
		};

		for (let key in disabledIngredients) {
			disabledIngredients[key] = disabledIngredients[key] < 1;
		}
		let burger = this.props.error ? (
			<p style={{ textAlign: "center", margin: 10 }}>
				Ingredients failed to load..
			</p>
		) : (
			<Spinner />
		);
		let orderSummary = null;
		if (this.props.Ingredients) {
			burger = (
				<Auxilary>
					<Burger Ingredients={this.props.Ingredients} />
					<BuildControls
						Ingredients={this.props.Ingredients}
						price={this.props.totalPrice}
						ingredientadded={this.props.AddIngredient}
						disabledIngredients={disabledIngredients}
						ingredientremoved={this.props.RemoveIngredient}
						purchaseable={this.updatePurchaseable(this.props.Ingredients)}
						ordered={this.purchaseHandler}
					/>
				</Auxilary>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.Ingredients}
					burgerPrice={this.props.totalPrice}
					cancelOrder={this.purchaseCancel}
					continueOrder={this.purchaseContinueHandler}
				/>
			);
		}

		if (this.props.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Auxilary>
				<Modal show={this.state.purchasing} modelClose={this.purchaseCancel}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxilary>
		);
	}
}

const mapStateToProps = (state) => ({
	Ingredients: state.burgerBuilder.Ingredients,
	totalPrice: state.burgerBuilder.totalPrice,
	loading: state.burgerBuilder.loading,
	error: state.burgerBuilder.error,
});

const mapDispatchToProps = (dispatch) => ({
	AddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
	RemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
	fetchIngredients: () => dispatch(actions.initIngredients()),
	onInitPurchased: () => dispatch(actions.purchaseInit()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
//export default BurgerBuilder;
