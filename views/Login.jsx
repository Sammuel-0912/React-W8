import {  useState } from "react";
// import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { createAsyncMessage } from "../slice/messageSlice";

const API_BASE = import.meta.env.VITE_API_BASE;

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = res.data;
      
      // 將 Token 存入 Cookie (hexToken)，並設定過期時間
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      
      // 成功後導向後台產品管理頁
      navigate('/admin/products');
    } catch (error) {
      alert('登入失敗：' + (error.response?.data?.message || '請檢查帳號密碼'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow border-0 p-4" style={{ width: '400px' }}>
        <h2 className="text-center fw-bold mb-4">後台管理登入</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="username" placeholder="name@example.com" value={formData.username} onChange={handleInputChange} required />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating mb-4">
            <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2 fw-bold" type="submit" disabled={isLoading}>
            {isLoading ? '登入中...' : '登入'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
