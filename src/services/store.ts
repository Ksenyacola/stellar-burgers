import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../components/root-reducer/rootReducer'; // Импортируете rootReducer
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector
} from 'react-redux';

// Создаем хранилище
const store = configureStore({
  reducer: rootReducer, // Используете rootReducer здесь
  devTools: process.env.NODE_ENV !== 'production'
});

// Создаем типы RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Создаем типизированные версии хуков
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
