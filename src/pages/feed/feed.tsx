import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { fetchFeeds, getFeedsSelector } from '../../services/slices/feeedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector(getFeedsSelector);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />;
};
