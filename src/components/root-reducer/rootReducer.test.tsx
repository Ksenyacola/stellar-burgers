import rootReducer from './rootReducer';
import burgerConstructorReducer from '../../services/slices/constructorSlice';
import { ingredientsReducer } from '../../services/slices/ingredientSlice';
import feedsReducer from '../../services/slices/feeedSlice';
import orderReducer from '../../services/slices/orderSlice';
import userReducer from '../../services/slices/userSlice';

describe('rootReducer', () => {
  it('корректная инициализация rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);
    expect(initialState).toEqual({
      burgerConstructor: burgerConstructorReducer(undefined, action),
      ingredients: ingredientsReducer(undefined, action),
      feeds: feedsReducer(undefined, action),
      order: orderReducer(undefined, action),
      user: userReducer(undefined, action)
    });
  });
});
