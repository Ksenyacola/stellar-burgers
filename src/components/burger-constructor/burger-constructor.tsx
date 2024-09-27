import { FC, useMemo } from 'react';
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

  const constructorItems = useAppSelector(selectBurgerConstructor);
  const orderRequest = useAppSelector(selectOrderLoading);
  const orderModalData = useAppSelector(selectOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.fillings.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrderThunk(ingredientIds));
  };

  const closeOrderModal = () => {
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
