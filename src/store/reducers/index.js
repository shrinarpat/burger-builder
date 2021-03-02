import {combineReducers} from 'redux';

import burgerBuilder from './burgerBuilderReducer';
import order from './orderReducer';

const rootReducer = combineReducers({
  burgerBuilder:burgerBuilder,
  order:order
});

export default rootReducer;

