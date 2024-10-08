import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { RootState } from '../store';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        const user = await getUserApi();
        dispatch(setUser(user.user));
      } finally {
        dispatch(setIsAuthChecked(true));
      }
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const registerThunk = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: TRegisterData) => {
    const registrationData = await registerUserApi({ name, email, password });
    setCookie('accessToken', registrationData.accessToken);
    localStorage.setItem('refreshToken', registrationData.refreshToken);
    return registrationData.user;
  }
);

export const loginThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const loginData = await loginUserApi({ email, password });
    setCookie('accessToken', loginData.accessToken);
    localStorage.setItem('refreshToken', loginData.refreshToken);

    return loginData.user;
  }
);

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const getUserOrdersThunk = createAsyncThunk(
  'user/getOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async ({ email, name, password }: Partial<TRegisterData>) => {
    const updatedUser = await updateUserApi({ email, name, password });
    return { user: updatedUser };
  }
);

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  orders: TOrder[];
  error?: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  orders: [],
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.error = null;
      });
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;

export const getIsAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const getUser = (state: RootState) => state.user.user;
export const getUserOrders = (state: RootState) => state.user.orders;

export default userSlice.reducer;
