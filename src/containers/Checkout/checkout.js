import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/checkoutSummary";
import ContactData from "./ContactData/contactData";

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};
	render() {
		let summary = <Redirect to="/" />;
		if (this.props.Ingredients) {
			const purchaseRedirect = this.props.purchased ? (
				<Redirect to="/" />
			) : null;
			summary = (
				<div>
					{purchaseRedirect}
					<CheckoutSummary
						Ingredients={this.props.Ingredients}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route
						path={this.props.match.url + "/contact-data"}
						component={ContactData}
					/>
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => ({
	Ingredients: state.burgerBuilder.Ingredients,
	totalPrice: state.burgerBuilder.totalPrice,
	purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
