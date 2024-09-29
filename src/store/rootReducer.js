import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productReducer,
});

export default rootReducer;
