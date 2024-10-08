import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

export type TIngredientsState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error?: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        if (action.payload) {
          state.buns = action.payload.filter((ing) => ing.type === 'bun');
          state.mains = action.payload.filter((ing) => ing.type === 'main');
          state.sauces = action.payload.filter((ing) => ing.type === 'sauce');
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectAllIngredients = (state: RootState) => state.ingredients;
export const ingredientsReducer = ingredientsSlice.reducer;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
