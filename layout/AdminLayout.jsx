// src/layout/AdminLayout.jsx
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminLayout = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 取出 Cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

    // 2. 設定 Axios 預設 Header (非常重要！)
    axios.defaults.headers.common['Authorization'] = token;

    // 3. 呼叫 Check API 確認身份
    const checkAuth = async () => {
      try {
        await axios.post(`${API_BASE}/api/user/check`);
        setIsAuth(true); // 驗證成功
      } catch (error) {
        console.error(error);
        alert('請先登入');
        navigate('/login'); // 失敗則退回登入頁
      }
    };

    if (token) {
      checkAuth();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!isAuth) return <div className="text-center py-5">驗證中...</div>;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/admin/products">後台管理系統</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/admin/products">產品管理</Link>
            <Link className="nav-link text-danger" onClick={() => {
              document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              navigate('/login');
            }}>登出</Link>
            
          </div>
        </div>
      </nav>
      <main className="py-4">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;