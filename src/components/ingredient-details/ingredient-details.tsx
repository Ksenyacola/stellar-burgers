import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

const selectIngredientList = (state: RootState) =>
  state.ingredients.ingredients;

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectIngredientList);

  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find(
    (item: TIngredient) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
