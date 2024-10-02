import { FC, memo, useCallback } from 'react';
import { useAppDispatch } from '../../services/store';
import { BurgerConstructorElementUI } from '@ui';
import {
  moveIngredient,
  removeIngredient,
  selectBurgerConstructor
} from '../../services/slices/constructorSlice';
import { BurgerConstructorElementProps } from './type';
import { useAppSelector } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index }) => {
    const dispatch = useAppDispatch();
    const constructorItems = useAppSelector(selectBurgerConstructor);
    const totalItems = constructorItems.mains.length;

    const handleMoveDown = () => {
      dispatch(
        moveIngredient({ fromIngredient: index, toIngredient: index + 1 })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        moveIngredient({ fromIngredient: index, toIngredient: index - 1 })
      );
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

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
