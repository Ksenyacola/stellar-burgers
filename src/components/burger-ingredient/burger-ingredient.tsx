import { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { addIngredient } from '../../services/slices/constructorSlice'; // Импортируйте нужное действие Redux
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    // Обработчик добавления ингредиента в конструктор
    const handleAdd = useCallback(() => {
      // Диспатчим действие Redux для добавления ингредиента в конструктор
      dispatch(addIngredient(ingredient));
    }, [dispatch, ingredient]);

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
