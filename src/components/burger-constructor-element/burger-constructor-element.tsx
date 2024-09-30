import { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BurgerConstructorElementUI } from '@ui';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/constructorSlice'; // Импортируем действия Redux
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    // Перемещение элемента вверх
    const handleMoveUp = useCallback(() => {
      if (index > 0) {
        dispatch(moveIngredient({ id: ingredient.id, moveDirection: 'up' }));
      }
    }, [dispatch, index, ingredient.id]);

    // Перемещение элемента вниз
    const handleMoveDown = useCallback(() => {
      if (index < totalItems - 1) {
        dispatch(moveIngredient({ id: ingredient.id, moveDirection: 'down' }));
      }
    }, [dispatch, index, totalItems, ingredient.id]);

    // Удаление элемента из конструктора
    const handleClose = useCallback(() => {
      dispatch(removeIngredient(ingredient.id));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
