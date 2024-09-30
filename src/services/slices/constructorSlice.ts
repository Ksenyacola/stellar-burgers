import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  fillings: TConstructorIngredient[];
  sauce: TConstructorIngredient[];
  selectedBun: TConstructorIngredient | null;
};

const initialState: TBurgerConstructorState = {
  bun: null,
  fillings: [],
  sauce: [],
  selectedBun: null
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
          if (!state.fillings.find((item) => item.id === action.payload.id)) {
            state.fillings.push(action.payload);
          }
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.fillings = state.fillings.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; moveDirection: 'up' | 'down' }>
    ) => {
      const { id, moveDirection } = action.payload;
      const index = state.fillings.findIndex((item) => item.id === id);

      if (index === -1) return;

      const swap = (
        arr: TConstructorIngredient[],
        index1: number,
        index2: number
      ) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
      };

      if (moveDirection === 'up' && index > 0) {
        swap(state.fillings, index, index - 1);
      } else if (
        moveDirection === 'down' &&
        index < state.fillings.length - 1
      ) {
        swap(state.fillings, index, index + 1);
      }
    },

    resetConstructor: (state) => {
      state.bun = null;
      state.fillings = [];
      state.sauce = [];
      state.selectedBun = null;
    }
  }
});

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
export const selectBun = (state: RootState) => state.burgerConstructor.bun;
export const selectFillings = (state: RootState) =>
  state.burgerConstructor.fillings;
export const selectSauce = (state: RootState) => state.burgerConstructor.sauce;
export const selectTotalIngredients = (state: RootState) =>
  state.burgerConstructor.fillings.length +
  (state.burgerConstructor.bun ? 1 : 0);

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
