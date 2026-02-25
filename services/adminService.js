// src/services/adminService.js (新增訂單管理功能，文章管理功能)
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

// 取得文章列表
export const getAdminArticles = (page = 1) => {
  return axios.get(`${API_BASE}/api/${API_PATH}/admin/articles?page=${page}`);
};

// 取得單篇文章細節
export const getAdminArticle = (id) => {
  return axios.get(`${API_BASE}/api/${API_PATH}/admin/article/${id}`);
};

// 新增文章
export const postAdminArticle = (data) => {
  return axios.post(`${API_BASE}/api/${API_PATH}/admin/article`, { data });
};

// 更新文章
export const putAdminArticle = (id, data) => {
  return axios.put(`${API_BASE}/api/${API_PATH}/admin/article/${id}`, { data });
};

// 刪除文章
export const deleteAdminArticle = (id) => {
  return axios.delete(`${API_BASE}/api/${API_PATH}/admin/article/${id}`);
};