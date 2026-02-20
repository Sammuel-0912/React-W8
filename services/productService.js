import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export const getProducts = (page = 1, category = '') => {
  const url = `${API_BASE}/api/${API_PATH}/products?page=${page}${category ? `&category=${category}` : ''}`;
  return axios.get(url);
};

// 預留加入購物車 API
export const addToCart = (product_id, qty) => {
  const url = `${API_BASE}/api/${API_PATH}/cart`;
  return axios.post(url, { data: { product_id, qty } });
};

// 送出訂單 API
export const createOrder = (data) => {
  const url = `${API_BASE}/api/${API_PATH}/order`;
  return axios.post(url, { data });
};