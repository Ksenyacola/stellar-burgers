import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../components/root-reducer/rootReducer';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
