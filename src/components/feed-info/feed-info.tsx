import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { RootState } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.feeds.orders
  );

  const feed = {
    total: useSelector((state: RootState) => state.feeds.total),
    totalToday: useSelector((state: RootState) => state.feeds.totalToday)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
