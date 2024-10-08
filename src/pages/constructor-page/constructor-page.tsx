import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import styles from './constructor-page.module.css';

import { BurgerIngredientsContainer } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { selectIngredients } from '../../services/slices/ingredientSlice';

export const ConstructorPage: FC = () => {
  const { isLoading } = useAppSelector((state) => state.ingredients);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredientsContainer />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
