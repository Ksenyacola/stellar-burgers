import { combineReducers } from '@reduxjs/toolkit';
import burgerConstructorReducer from '../../services/slices/constructorSlice';
import ingredientsReducer from '../../services/slices/ingredientSlice';
import feedsReducer from '../../services/slices/feeedSlice';
import orderReducer from '../../services/slices/orderSlice';
import userReducer from '../../services/slices/userSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  order: orderReducer,
  user: userReducer
});

export default rootReducer;
