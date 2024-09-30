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

    const handleMoveUp = useCallback(() => {
      if (index > 0) {
        dispatch(moveIngredient({ id: ingredient.id, moveDirection: 'up' }));
      }
    }, [dispatch, index, ingredient.id]);

    const handleMoveDown = useCallback(() => {
      if (index < totalItems - 1) {
        dispatch(moveIngredient({ id: ingredient.id, moveDirection: 'down' }));
      }
    }, [dispatch, index, totalItems, ingredient.id]);

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
