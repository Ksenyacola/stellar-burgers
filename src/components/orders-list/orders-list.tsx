import { FC, memo, useMemo } from 'react';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { TOrder } from '@utils-types';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
