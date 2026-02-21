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

// 取得後台產品列表 (分頁)
export const getAdminProducts = (page = 1) => {
  return axios.get(`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`);
};

// 新增產品
export const postAdminProduct = (data) => {
  return axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, { data });
};

// 更新產品
export const putAdminProduct = (id, data) => {
  return axios.put(`${API_BASE}/api/${API_PATH}/admin/product/${id}`, { data });
};

// 刪除產品
export const deleteAdminProduct = (id) => {
  return axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
};
//圖片上傳
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file-to-upload', file); // API 規定的 key 值
  return axios.post(`${API_BASE}/api/${API_PATH}/admin/upload`, formData);
};