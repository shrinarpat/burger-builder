import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	};
};

export const initIngredientsFetchRequest = () => {
	return {
		type: actionTypes.INIT_INGREDIENTS_FETCH_REQUEST,
	};
};

export const setIngredients = (ings) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ings,
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILD,
	};
};

export const initIngredients = () => {
	return (dispatch) => {
		dispatch(initIngredientsFetchRequest());
		axios
			.get(
				"https://burger-builder-34087-default-rtdb.firebaseio.com/ingredients.json"
			)
			.then((res) => {
				dispatch(setIngredients(res.data));
			})
			.catch(() => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
