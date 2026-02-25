// src/services/articleService.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 取得前台文章列表
export const getArticles = (page = 1) => {
    return axios.get(`${API_BASE}/api/${API_PATH}/articles?page=${page}`);
};

// 取得前台單篇文章詳細資訊
export const getArticle = (id) => {
    return axios.get(`${API_BASE}/api/${API_PATH}/article/${id}`);
};