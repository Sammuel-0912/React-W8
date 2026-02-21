// src/services/adminService.js (新增訂單管理功能)
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 取得所有訂單
export const getAdminOrders = (page = 1) => {
  return axios.get(`${API_BASE}/api/${API_PATH}/admin/orders?page=${page}`);
};

// 修改單筆訂單 (通常用於修改付款狀態或收件人資訊)
export const putAdminOrder = (id, data) => {
  return axios.put(`${API_BASE}/api/${API_PATH}/admin/order/${id}`, { data });
};

// 刪除單筆訂單
export const deleteAdminOrder = (id) => {
  return axios.delete(`${API_BASE}/api/${API_PATH}/admin/order/${id}`);
};

// 刪除全部訂單
export const deleteAllAdminOrders = () => {
  return axios.delete(`${API_BASE}/api/${API_PATH}/admin/orders/all`);
};