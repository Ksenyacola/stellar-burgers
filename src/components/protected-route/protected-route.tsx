import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/slices/userSlice';
import { useAppSelector } from '../../services/store';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  AuthUser?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  AuthUser = false,
  component
}): React.JSX.Element => {
  const user = useAppSelector(getUser);
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!AuthUser && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (AuthUser && user) {
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = (props: { component: React.JSX.Element }) => (
  <ProtectedRoute {...props} />
);

export const AuthUser = (props: { component: React.JSX.Element }) => (
  <ProtectedRoute AuthUser {...props} />
);
