import { Outlet, Link, NavLink } from "react-router-dom";
import "../src/assets/all.scss";
import MessageToast from "../component/MessageToast";

const Layout = () => {
  return (
    <>
      <MessageToast /> {/* 置於最外層，不受頁面內容影響 */}
      <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            迪士尼小物販賣精選店鋪
          </Link>

          <div className="navbar-nav ms-auto">
            <NavLink
              className="nav-item nav-link me-4"
              to="/products"
            >
              Products
            </NavLink>

            <NavLink
              className="nav-item nav-link"
              to="/cart"
            >
              Cart
            </NavLink>
            <NavLink
              className="nav-item nav-link"
              to="/admin/products"
            >
              Admin
            </NavLink>
            <NavLink
              className="nav-item nav-link d-inline h4 mx-2"
              to="/admin/orders"
            >
              Admin Orders
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer text-center">
        <div className="container">
          <p>Copyright © 2026 SamDisnead's Page</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;