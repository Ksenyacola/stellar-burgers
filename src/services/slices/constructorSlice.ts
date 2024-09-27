import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

// Тип состояния конструктора
type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  fillings: TConstructorIngredient[];
};

// Начальное состояние
const initialState: TBurgerConstructorState = {
  bun: null,
  fillings: []
};

// Создание слайса с редюсерами для управления состоянием конструктора
export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // Добавление ингредиента в конструктор
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload; // Заменить текущую булку на новую
        } else {
          // Проверка на уникальность добавляемого ингредиента в fillings
          if (!state.fillings.find((item) => item.id === action.payload.id)) {
            state.fillings.push(action.payload);
          }
        }
      },
      // Используем prepare, чтобы сгенерировать уникальный id для каждого ингредиента
      prepare: (ingredient: TIngredient) => {
        const id = nanoid(); // Генерация уникального id для ингредиента
        return { payload: { ...ingredient, id } };
      }
    },

    // Удаление ингредиента из конструктора
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.fillings = state.fillings.filter(
        (item) => item.id !== action.payload
      );
    },

    // Перемещение ингредиента в списке вверх или вниз
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; moveDirection: 'up' | 'down' }>
    ) => {
      const { id, moveDirection } = action.payload;
      const index = state.fillings.findIndex((item) => item.id === id);

      if (index === -1) return; // Если ингредиент не найден, выходим из функции

      // Вспомогательная функция для замены местами элементов массива
      const swap = (
        arr: TConstructorIngredient[],
        index1: number,
        index2: number
      ) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
      };

      // Логика перемещения вверх
      if (moveDirection === 'up' && index > 0) {
        swap(state.fillings, index, index - 1);
      }
      // Логика перемещения вниз
      else if (moveDirection === 'down' && index < state.fillings.length - 1) {
        swap(state.fillings, index, index + 1);
      }
    },

    // Сброс состояния конструктора
    resetConstructor: (state) => {
      state.bun = null;
      state.fillings = [];
    }
  }
});

// Селекторы для извлечения данных из состояния конструктора
export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
export const selectBun = (state: RootState) => state.burgerConstructor.bun;
export const selectFillings = (state: RootState) =>
  state.burgerConstructor.fillings;
export const selectTotalIngredients = (state: RootState) =>
  state.burgerConstructor.fillings.length +
  (state.burgerConstructor.bun ? 1 : 0);

// Экспортируем действия и редюсер слайса
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
