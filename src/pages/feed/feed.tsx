import { FC, useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { fetchFeeds, getFeedsSelector } from '../../services/slices/feeedSlice';
import { Preloader } from '@ui';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector(getFeedsSelector);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
