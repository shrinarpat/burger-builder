import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Button from "../../../components/UI/Button/button";
import Spinner from "../../../components/UI/Spinner/spinner";
import classes from "./contactData.module.css";
import Input from "../../../components/UI/Form/Input/input";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
				value: "",
				validationRule: {
					required: true,
					validity: false,
				},
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Street",
				},
				value: "",
				touched: false,
				validationRule: {
					required: true,
					validity: false,
				},
			},
			zipcode: {
				elementType: "input",
				elementConfig: {
					type: "input",
					placeholder: "ZIP Code",
				},
				value: "",
				touched: false,
				validationRule: {
					required: true,
					minLength: 5,
					maxLength: 5,
					validity: false,
				},
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
				value: "",
				touched: false,
				validationRule: {
					required: true,
					validity: false,
				},
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your Mail",
				},
				value: "",
				touched: false,
				validationRule: {
					required: true,
					mail: true,
					validity: false,
				},
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "normal", displayValue: "Normal" },
					],
				},
				value: "normal",
				validationRule: {
					validity: true,
				},
			},
		},
		formIsValid: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		const orderData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			orderData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const data = {
			ingredients: this.props.Ingredients,
			price: this.props.price,
			formData: orderData,
		};
		this.props.onOrderBurger(data);
	};

	validityCheck = (value, rule) => {
		let isValid = true;
		if (rule.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rule.minLength) {
			isValid = value.length >= 6 && isValid;
		}
		if (rule.maxLength) {
			isValid = value.length <= 6 && isValid;
		}
		if (rule.mail) {
			let validMail = false;
			const dotPosition = value.indexOf(".");
			const atPosition = value.indexOf("@");
			if (
				dotPosition !== -1 &&
				dotPosition !== 0 &&
				atPosition < dotPosition - 2 &&
				atPosition !== -1
			) {
				validMail = true;
			}
			isValid = validMail && isValid;
		}
		return isValid;
	};

	inputChangeHandler = (event, identifier) => {
		//console.log(e.target.value);
		let updateOrderForm = { ...this.state.orderForm };
		const updatedFormElement = { ...updateOrderForm[identifier] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.validationRule.validity = this.validityCheck(
			updatedFormElement.value,
			updatedFormElement.validationRule
		);
		updatedFormElement.touched = true;
		//console.log(updatedFormElement);
		updateOrderForm[identifier] = updatedFormElement;

		let formIsValid = true;
		for (let fe in updateOrderForm) {
			formIsValid = updateOrderForm[fe].validationRule.validity && formIsValid;
		}
		console.log(formIsValid);

		this.setState({
			orderForm: updateOrderForm,
			formIsValid: formIsValid,
		});
	};

	render() {
		let formData = [];
		for (let key in this.state.orderForm) {
			formData.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		let formElements = formData.map((formElement) => {
			return (
				<Input
					key={formElement.id}
					valueType={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					inValid={!formElement.config.validationRule.validity}
					touched={formElement.config.touched}
					changed={(event) => this.inputChangeHandler(event, formElement.id)}
				/>
			);
		});

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElements}
				<Button
					type="Success"
					clicked={this.orderHandler}
					disabled={!this.state.formIsValid}
				>
					Order
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h2>Enter Your Details:</h2>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	Ingredients: state.burgerBuilder.Ingredients,
	price: state.burgerBuilder.totalPrice,
	loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
	onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
