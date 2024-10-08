import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  mains: TConstructorIngredient[];
  sauce: TConstructorIngredient[];
  selectedBun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  mains: [],
  sauce: [],
  selectedBun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else if (
          action.payload.type === 'main' ||
          action.payload.type === 'sauce'
        ) {
          if (!state.mains.find((item) => item.id === action.payload.id)) {
            state.mains = [...state.mains, action.payload];
          }
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.mains = state.mains.filter((item) => item.id !== action.payload);
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ fromIngredient: number; toIngredient: number }>
    ) => {
      const { fromIngredient, toIngredient } = action.payload;

      if (toIngredient < 0 || toIngredient >= state.mains.length) return;

      const movedItem = state.mains.splice(fromIngredient, 1)[0];
      state.mains.splice(toIngredient, 0, movedItem);
    },

    resetConstructor: (state) => {
      state.bun = null;
      state.mains = [];
      state.sauce = [];
      state.selectedBun = null;
    }
  }
});

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
export const selectBun = (state: RootState) => state.burgerConstructor.bun;
export const selectFillings = (state: RootState) =>
  state.burgerConstructor.mains;
export const selectSauce = (state: RootState) => state.burgerConstructor.sauce;
export const selectTotalIngredients = (state: RootState) =>
  state.burgerConstructor.mains.length + (state.burgerConstructor.bun ? 1 : 0);

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
