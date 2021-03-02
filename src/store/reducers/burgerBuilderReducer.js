import * as actionTypes from "../actions/actionTypes";

const initialState = {
	Ingredients: null,
	totalPrice: 10,
	loading: false,
	error: false,
};

const INGREDIENTS_PRICE = {
	salad: 2,
	cheese: 5,
	meat: 3,
	bacon: 4,
};

const burgerBuilderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				Ingredients: {
					...state.Ingredients,
					[action.ingredientName]: state.Ingredients[action.ingredientName] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				Ingredients: {
					...state.Ingredients,
					[action.ingredientName]: state.Ingredients[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
			};
		case actionTypes.INIT_INGREDIENTS_FETCH_REQUEST:
			return {
				...state,
				loading: true,
				error: false,
			};
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				loading: false,
				error: false,
				totalPrice: 10,
				Ingredients: action.ingredients,
			};
		case actionTypes.FETCH_INGREDIENTS_FAILD:
			return {
				...state,
				loading: false,
				error: true,
			};
		default:
			return state;
	}
};

export default burgerBuilderReducer;
