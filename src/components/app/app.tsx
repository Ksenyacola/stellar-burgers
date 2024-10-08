import React, { FC, useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useMatch
} from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal } from '@components';
import { OrderInfo } from '../order-info/order-info';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { useAppDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/userSlice';
import { fetchIngredients } from '../../services/slices/ingredientSlice';

import {
  OnlyAuth,
  AuthUser,
  ProtectedRoute
} from '../protected-route/protected-route';

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const profileOrderNumber = useMatch('/profile/orders/:number')?.params.number;
  const feedOrderNumber = useMatch('/feed/:number')?.params.number;

  const number = profileOrderNumber || feedOrderNumber;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<AuthUser component={<Login />} />} />
        <Route
          path='/register'
          element={<AuthUser component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<AuthUser component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<AuthUser component={<ResetPassword />} />}
        />

        <Route
          path='/profile'
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />

        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                #{number ? number.padStart(6, '0') : 'неизвестный'}
              </p>
              <OrderInfo />
            </div>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${number && number.padStart(6, '0')}`}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#${number && number.padStart(6, '0')}`}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
