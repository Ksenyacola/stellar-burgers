import { FC, memo, useCallback } from 'react';
import { useAppDispatch } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { addIngredient } from '../../services/slices/constructorSlice';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = useCallback(() => {
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
