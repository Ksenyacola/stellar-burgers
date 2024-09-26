import { FC, useMemo } from 'react';
// Импортируйте типизированные хуки
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectBurgerConstructor } from '../../services/slices/constructorSlice';
import {
  selectOrderLoading,
  selectOrderData,
  createOrderThunk,
  resetOrderState
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  // Используем useAppSelector для выбора данных из хранилища
  const constructorItems = useAppSelector(selectBurgerConstructor);
  const orderRequest = useAppSelector(selectOrderLoading);
  const orderModalData = useAppSelector(selectOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    // Формируем массив ID ингредиентов для заказа
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.fillings.map((item) => item._id),
      constructorItems.bun._id // Добавляем булочку второй раз для нижней части бургера
    ];

    // Диспатчим действие для создания заказа
    dispatch(createOrderThunk(ingredientIds));
  };

  const closeOrderModal = () => {
    // Закрываем модальное окно заказа
    dispatch(resetOrderState());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const fillingsPrice = constructorItems.fillings.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + fillingsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
