import store from '../../store';
import rootReducer from '../../../components/root-reducer/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../../store';

describe('store', () => {
  it('правильная инициализация store', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);
    const testStore = configureStore({
      reducer: rootReducer,
      devTools: false
    });
    expect(testStore.getState()).toEqual(initialState);
  });

  it('store должен содержать rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state: RootState = store.getState();
    const expectedState = rootReducer(undefined, action);
    expect(state).toEqual(expectedState);
  });

  it('проверка работы devTools в зависимости от NODE_ENV', () => {
    process.env.NODE_ENV = 'development';
    const devStore = configureStore({
      reducer: rootReducer,
      devTools: true
    });
    expect(devStore).toBeTruthy();

    process.env.NODE_ENV = 'production';
    const prodStore = configureStore({
      reducer: rootReducer,
      devTools: false
    });
    expect(prodStore).toBeTruthy();
  });
});
