import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store';
import styles from './profile-orders.module.css';
import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { getUserOrdersThunk } from '../../../../services/slices/userSlice';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.user.orders);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} />
      </div>
    </main>
  );
};
