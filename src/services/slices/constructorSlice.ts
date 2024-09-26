import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  fillings: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  fillings: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.fillings.push(action.payload);
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

      if (moveDirection === 'up' && index > 0) {
        [state.fillings[index], state.fillings[index - 1]] = [
          state.fillings[index - 1],
          state.fillings[index]
        ];
      } else if (
        moveDirection === 'down' &&
        index < state.fillings.length - 1
      ) {
        [state.fillings[index], state.fillings[index + 1]] = [
          state.fillings[index + 1],
          state.fillings[index]
        ];
      }
    },

    resetConstructor: (state) => {
      state.bun = null;
      state.fillings = [];
    }
  }
});

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
