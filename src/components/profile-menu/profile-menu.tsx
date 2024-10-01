import { FC, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProfileMenuUI } from '@ui';
import { AppDispatch, useAppSelector } from '../../services/store';
import { logoutThunk, getIsAuthChecked } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthChecked = useAppSelector(getIsAuthChecked);

  const handleLogout = useCallback(() => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Ошибка при выходе из профиля:', error);
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isAuthChecked) {
      navigate('/login');
    }
  }, [isAuthChecked, navigate]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
