import { Outlet,  NavLink } from "react-router-dom";
import "../src/assets/all.scss";
import MessageToast from "../component/MessageToast";
import { useState } from "react";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
        <MessageToast /> {/* 置於最外層，不受頁面內容影響 */}
        <header className="sticky-top bg-white shadow-sm">
          <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">
                Disney Store
              </NavLink>
              {/* 漢堡選單按鈕（小螢幕時出現） */}
              <button
                className="navbar-toggler"
                type="button"
                // data-bs-toggle="collapse"
                // data-bs-target="#navbarNav"
                // aria-controls="navbarNav"
                aria-expanded={open}
                // aria-label="Toggle navigation"
                onClick={() => setOpen(!open)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className={`collapse navbar-collapse ${open ? "show" :""}`} id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/">首頁</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/products">產品列表</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/cart">購物車</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/blog">故事館</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/admin/products">後台產品管理</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/admin/orders">後台訂單管理</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/admin/coupons">後台優惠券管理</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/admin/articles">後台文章管理</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="footer text-center">
        <div className="container">
          <p>Copyright © 2026 Disneads Page</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;