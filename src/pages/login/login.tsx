import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { loginThunk } from '../../services/slices/userSlice';
import { ConstructorPage } from '../constructor-page';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginThunk({
        email: email,
        password: password
      })
    );
  };

  const isAuth = useAppSelector((state) => state.user.isAuthChecked);

  if (isAuth) {
    return <ConstructorPage />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
