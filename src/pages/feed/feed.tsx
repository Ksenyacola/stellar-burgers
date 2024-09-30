import { FC, useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { fetchFeeds, getFeedsSelector } from '../../services/slices/feeedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector(getFeedsSelector);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
