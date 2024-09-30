import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/slices/userSlice';
import { useAppSelector } from '../../services/store';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  component
}): React.ReactElement => {
  const user = useAppSelector(getUser);
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = (props: { component: React.ReactElement }) => (
  <ProtectedRoute {...props} />
);

export const AuthUser = (props: { component: React.ReactElement }) => (
  <ProtectedRoute onlyUnAuth {...props} />
);
