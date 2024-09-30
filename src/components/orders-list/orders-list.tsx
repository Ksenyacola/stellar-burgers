import { FC, memo, useMemo } from 'react';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { TOrder } from '@utils-types';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  // Исправление: убрать фигурные скобки и return для соответствия правилам eslint
  const orderByDate: TOrder[] = useMemo(
    () =>
      [...orders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [orders]
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
