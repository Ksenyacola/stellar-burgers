import { FC, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectBurgerConstructor,
  resetConstructor
} from '../../services/slices/constructorSlice';
import {
  selectOrderLoading,
  selectOrderData,
  createOrderThunk,
  resetOrderState
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const constructorItems = useAppSelector(selectBurgerConstructor);
  const user = useAppSelector(getUser);
  const orderRequest = useAppSelector(selectOrderLoading);
  const orderModalData = useAppSelector(selectOrderData);

  const closeOrderModal = () => {
    dispatch(resetOrderState());
    dispatch(resetConstructor());
  };

  const onOrderClick = () => {
    if (!user) {
      localStorage.setItem(
        'constructorItems',
        JSON.stringify(constructorItems)
      );
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.mains.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrderThunk(ingredientIds));
  };

  useEffect(() => {
    const savedConstructorItems = localStorage.getItem('constructorItems');
    if (savedConstructorItems && !user) {
      dispatch(resetConstructor(JSON.parse(savedConstructorItems)));
      localStorage.removeItem('constructorItems');
    }
    dispatch(resetOrderState());
  }, [user, dispatch]);

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const fillingsPrice = constructorItems.mains.reduce(
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
