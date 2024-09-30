import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { getUser, updateUserThunk } from '../../services/slices/userSlice';

type TFormValue = {
  name: string;
  email: string;
  password: string;
};

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser) || { name: '', email: '' };

  const [formValue, setFormValue] = useState<TFormValue>({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    formValue.password !== '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(
        updateUserThunk({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      );
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
