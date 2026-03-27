import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAsyncMessage } from './messageSlice'; // 引入通知 Action

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 取得購物車
export const getCartAsync = createAsyncThunk('cart/getCart', async () => {
  const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
  return response.data.data;
});

// 加入購物車
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart', async ({ product_id, qty }, { dispatch }) => {
    try {
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: { product_id, qty }
  });


// 成功通知
dispatch(createAsyncMessage({
  success: true,
  message: '已成功加入購物車'
}));

dispatch(getCartAsync());
return response.data;
} catch (error) {
  // 失敗通知
  dispatch(createAsyncMessage({
    success: false,
    message: error.response?.data?.message || '加入購物車失敗'
  }));
  throw error;
    }
  }
);

// 更新購物車數量
export const updateCartAsync = createAsyncThunk('cart/updateCart', async ({ id, product_id, qty }, { dispatch }) => {
  const response = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`, {
    data: { product_id, qty }
  });
  dispatch(getCartAsync());
  return response.data;
});

// 刪除單一項目
export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteItem', async (id, { dispatch }) => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
      dispatch(createAsyncMessage({
        success: true,
        message: '已成功刪除購物車項目'
      }));
      dispatch(getCartAsync());
    } catch {
      dispatch(createAsyncMessage({
        success: false,
        message: '刪除失敗'
      }));
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    total: 0,
    final_total: 0,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartAsync.pending, (state) => { state.isLoading = true; })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload.carts;
        state.total = action.payload.total;
        state.final_total = action.payload.final_total;
        state.isLoading = false;
      })
      .addCase(getCartAsync.rejected, (state) => { state.isLoading = false; });
  },
});

export default cartSlice.reducer;