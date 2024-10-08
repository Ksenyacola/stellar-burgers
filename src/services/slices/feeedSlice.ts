import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TIngredient } from '@utils-types';
import { RootState } from '../store';

export const fetchFeeds = createAsyncThunk<
  { success: boolean; total: number; totalToday: number; orders: TOrder[] }, // Тип возвращаемых данных
  void, // Тип аргументов
  { rejectValue: string } // Тип ошибки, возвращаемой при reject
>('feeds/fetchFeeds', async (_, { rejectWithValue }) => {
  try {
    const response = await getFeedsApi();
    return response;
  } catch (error) {
    return rejectWithValue('Ошибка получения фидов');
  }
});

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

export type TFeedsState = {
  order: TOrder | null;
  ingredients: TIngredient[];
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TFeedsState = {
  order: null,
  orders: [],
  ingredients: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const getFeedsSelector = (state: RootState) => state.feeds;

export default feedsSlice.reducer;
