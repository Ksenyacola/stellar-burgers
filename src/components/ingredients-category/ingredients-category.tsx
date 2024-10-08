import { forwardRef, useMemo } from 'react';
import { useAppSelector } from '../../services/store';
import { TIngredientsCategoryProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const burgerConstructor = useAppSelector((state) => state.burgerConstructor);

  const ingredientsCounters = useMemo(() => {
    const { bun, mains } = burgerConstructor;
    const counters: { [key: string]: number } = {};

    mains.forEach((ingredient: TConstructorIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    if (bun) counters[bun._id] = (counters[bun._id] || 0) + 2;

    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
