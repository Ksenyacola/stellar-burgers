import { FC, useMemo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { fetchOrderByNumberThunk } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams<{ number: string }>();

  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  const orderData = useAppSelector((state) =>
    state.order.orderData && state.order.orderData.number === Number(number)
      ? state.order.orderData
      : null
  );

  useEffect(() => {
    if (!orderData && number) {
      dispatch(fetchOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, number, orderData]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, itemId) => {
        if (!acc[itemId]) {
          const ingredient = ingredients.find((ing) => ing._id === itemId);
          if (ingredient) {
            acc[itemId] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[itemId].count++;
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
