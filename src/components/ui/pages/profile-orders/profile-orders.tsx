import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store'; // Подключение селекторов и диспатча
import styles from './profile-orders.module.css';
import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { getUserOrdersThunk } from '../../../../services/slices/userSlice'; // Импорт Thunk

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.user.orders); // Получаем заказы пользователя

  useEffect(() => {
    dispatch(getUserOrdersThunk()); // Диспатчим запрос на получение заказов
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
