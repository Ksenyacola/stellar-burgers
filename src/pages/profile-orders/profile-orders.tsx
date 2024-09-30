import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  getUserOrdersThunk,
  getUserOrders
} from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();

  const orders: TOrder[] = useAppSelector(getUserOrders) || [];

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
